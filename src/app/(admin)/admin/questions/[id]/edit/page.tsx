"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Question, Module, Chapter, QuestionType, McqOption } from "@/types/database";

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;
  const toast = useToast();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [question, setQuestion] = useState<Question | null>(null);
  const [moduleId, setModuleId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("mcq");
  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("2");
  const [priority, setPriority] = useState("2");
  const [tags, setTags] = useState("");
  const [examLink, setExamLink] = useState("");

  const [mcqOptions, setMcqOptions] = useState<McqOption[]>(
    Array.from({ length: 4 }, (_, i) => ({
      id: String.fromCharCode(97 + i),
      text: "",
      is_correct: false,
    }))
  );
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<"true" | "false">(
    "true"
  );
  const [openAnswer, setOpenAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const questionRes = (await supabase.from("questions").select("*").eq("id", questionId).single()) as { data: Question | null };
        const modulesRes = (await supabase.from("modules").select("*").order("order_index")) as { data: Module[] | null };

        if (questionRes.data) {
          const q = questionRes.data as Question;
          setQuestion(q);
          setModuleId(q.module_id);
          setChapterId(q.chapter_id);
          setQuestionType(q.question_type);
          setQuestionText(q.question_text);
          setExplanation(q.explanation || "");
          setDifficulty(q.difficulty.toString());
          setPriority(q.priority.toString());
          setTags(q.tags?.join(", ") || "");
          setExamLink(q.exam_link || "");

          if (q.question_type === "mcq" && q.options) {
            setMcqOptions(q.options);
          } else if (q.question_type === "true_false") {
            setTrueFalseAnswer(q.correct_answer as "true" | "false");
          } else if (q.question_type === "open_short") {
            setOpenAnswer(q.correct_answer);
          }
        }

        if (modulesRes.data) {
          setModules(modulesRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [questionId]);

  useEffect(() => {
    async function fetchChapters() {
      if (!moduleId) {
        setChapters([]);
        return;
      }

      try {
        const { data } = await supabase
          .from("chapters")
          .select("*")
          .eq("module_id", moduleId)
          .order("order_index");
        setChapters(data || []);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }

    fetchChapters();
  }, [moduleId]);

  const handleMcqOptionChange = (index: number, text: string) => {
    const newOptions = [...mcqOptions];
    newOptions[index].text = text;
    setMcqOptions(newOptions);
  };

  const handleMcqCorrectAnswer = (index: number) => {
    const newOptions = mcqOptions.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }));
    setMcqOptions(newOptions);
  };

  const handleSave = async () => {
    if (!moduleId || !chapterId || !questionText) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    let correctAnswer = "";
    let options: McqOption[] | null = null;

    if (questionType === "mcq") {
      const hasCorrect = mcqOptions.some((opt) => opt.is_correct);
      if (!hasCorrect || mcqOptions.some((opt) => !opt.text)) {
        toast.error("Veuillez remplir toutes les options et en sélectionner une");
        return;
      }
      options = mcqOptions;
      correctAnswer = mcqOptions.find((opt) => opt.is_correct)!.id;
    } else if (questionType === "true_false") {
      correctAnswer = trueFalseAnswer;
    } else if (questionType === "open_short") {
      if (!openAnswer) {
        toast.error("Veuillez entrer une réponse attendue");
        return;
      }
      correctAnswer = openAnswer;
    }

    setSaving(true);
    try {
      await supabase
        .from("questions")
        .update({
          chapter_id: chapterId,
          module_id: moduleId,
          question_type: questionType,
          question_text: questionText,
          options,
          correct_answer: correctAnswer,
          explanation,
          difficulty: parseInt(difficulty),
          priority: parseInt(priority),
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          exam_link: examLink || null,
        } as never)
        .eq("id", questionId);

      toast.success("Question mise à jour");
      router.push("/admin/questions");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Question non trouvée</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Modifier la question
        </h1>
      </div>

      <Card className="space-y-6">
        {/* Module */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Module *
          </label>
          <select
            value={moduleId}
            onChange={(e) => {
              setModuleId(e.target.value);
              setChapterId("");
            }}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="">Sélectionner un module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.code} - {m.title}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chapitre *
          </label>
          <select
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
            disabled={!moduleId}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm disabled:opacity-50"
          >
            <option value="">Sélectionner un chapitre</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type de question *
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="mcq">QCM</option>
            <option value="true_false">Vrai/Faux</option>
            <option value="open_short">Question ouverte courte</option>
            <option value="drag_drop">Drag & Drop</option>
          </select>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Énoncé de la question *
          </label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full min-h-[80px] py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            placeholder="Entrez l'énoncé..."
          />
        </div>

        {/* MCQ Options */}
        {questionType === "mcq" && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Options
            </h3>
            {mcqOptions.map((option, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="correct_answer"
                  checked={option.is_correct}
                  onChange={() => handleMcqCorrectAnswer(index)}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-600 dark:text-gray-400 min-w-fit">
                  {String.fromCharCode(65 + index)}.
                </label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleMcqOptionChange(index, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  className="flex-1 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}

        {/* True/False */}
        {questionType === "true_false" && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Réponse correcte
            </h3>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tf_answer"
                  value="true"
                  checked={trueFalseAnswer === "true"}
                  onChange={() => setTrueFalseAnswer("true")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Vrai</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tf_answer"
                  value="false"
                  checked={trueFalseAnswer === "false"}
                  onChange={() => setTrueFalseAnswer("false")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Faux</span>
              </label>
            </div>
          </div>
        )}

        {/* Open Answer */}
        {questionType === "open_short" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Réponse attendue *
            </label>
            <textarea
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              className="w-full min-h-[80px] py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              placeholder="Entrez la réponse attendue..."
            />
          </div>
        )}

        {/* Explanation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Explication
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full min-h-[80px] py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            placeholder="Entrez l'explication..."
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulté
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="1">1 (Facile)</option>
            <option value="2">2 (Moyen)</option>
            <option value="3">3 (Difficile)</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priorité
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="1">1 (Basse)</option>
            <option value="2">2 (Moyenne)</option>
            <option value="3">3 (Haute)</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="ex: important, récurrent, piège"
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        {/* Exam Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lien épreuve
          </label>
          <input
            type="text"
            value={examLink}
            onChange={(e) => setExamLink(e.target.value)}
            placeholder="https://..."
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/questions")}
          disabled={saving}
        >
          Annuler
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Mise à jour..." : "Sauvegarder"}
        </Button>
      </div>
    </div>
  );
}

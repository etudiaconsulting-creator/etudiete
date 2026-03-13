"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createClient } from "@/lib/supabase/client";
import { Question, Module, Chapter, QuestionType } from "@/types/database";
import { ChevronRight, AlertCircle, Copy, Trash2, Upload } from "lucide-react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: "" });
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const questionTypeLabels: Record<QuestionType, string> = {
    mcq: "QCM",
    true_false: "Vrai/Faux",
    open_short: "Ouverte courte",
    drag_drop: "Drag & Drop",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [moduleRes, questionRes] = await Promise.all([
          supabase.from("modules").select("*").order("order_index"),
          supabase.from("questions").select("*"),
        ]);

        setModules(moduleRes.data || []);
        setQuestions(questionRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedModule) {
      const moduleChapters = chapters.filter(
        (c) => c.module_id === selectedModule
      );
      if (!moduleChapters.find((c) => c.id === selectedChapter)) {
        setSelectedChapter("");
      }
    }
  }, [selectedModule]);

  useEffect(() => {
    async function fetchChapters() {
      if (!selectedModule) {
        setChapters([]);
        return;
      }

      try {
        const { data } = await supabase
          .from("chapters")
          .select("*")
          .eq("module_id", selectedModule)
          .order("order_index");

        setChapters(data || []);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }

    fetchChapters();
  }, [selectedModule]);

  const filteredQuestions = questions.filter((q) => {
    if (selectedModule && q.module_id !== selectedModule) return false;
    if (selectedChapter && q.chapter_id !== selectedChapter) return false;
    if (selectedType && q.question_type !== selectedType) return false;
    if (selectedDifficulty && q.difficulty !== parseInt(selectedDifficulty))
      return false;
    if (selectedPriority && q.priority !== parseInt(selectedPriority))
      return false;
    return true;
  });

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await supabase.from("questions").delete().eq("id", deleteDialog.id);
      setQuestions((prev) => prev.filter((q) => q.id !== deleteDialog.id));
      toast.success("Question supprimée");
      setDeleteDialog({ open: false, id: "" });
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  const handleDuplicate = async (question: Question) => {
    try {
      const newId = crypto.randomUUID();
      const newQuestion = {
        ...question,
        id: newId,
        question_text: `${question.question_text} (copie)`,
      };

      await supabase
        .from("questions")
        .insert([newQuestion as never]);

      toast.success("Question dupliquée");
      window.location.href = `/admin/questions/${newId}/edit`;
    } catch (error) {
      console.error("Error duplicating question:", error);
      toast.error("Erreur lors de la duplication");
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        toast.error("Format invalide: doit être un tableau JSON");
        return;
      }

      const preview = data.slice(0, 3);
      const confirmed = window.confirm(
        `${data.length} questions à importer.\n\nAperçu:\n${preview
          .map((q: any) => q.question_text?.substring(0, 50))
          .join("\n")}\n\nContinuer?`
      );

      if (confirmed) {
        const questionsToInsert = data.map((q: any) => ({
          id: crypto.randomUUID(),
          chapter_id: q.chapter_id,
          module_id: q.module_id,
          question_type: q.question_type,
          question_text: q.question_text,
          options: q.options || null,
          correct_answer: q.correct_answer || "",
          explanation: q.explanation || "",
          difficulty: q.difficulty || 1,
          priority: q.priority || 1,
          tags: q.tags || [],
          exam_link: q.exam_link || null,
          created_at: new Date().toISOString(),
        }));

        await supabase
          .from("questions")
          .insert(questionsToInsert as never);

        setQuestions((prev) => [...prev, ...questionsToInsert]);
        toast.success(`${data.length} questions importées`);
      }
    } catch (error) {
      console.error("Error importing questions:", error);
      toast.error("Erreur lors de l'importation");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  const getModuleCode = (moduleId: string) => {
    return modules.find((m) => m.id === moduleId)?.code || "";
  };

  const getChapterTitle = (chapterId: string) => {
    return chapters.find((c) => c.id === chapterId)?.title || "";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Questions
        </h1>
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <Button
            variant="outline"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Importer (JSON)
          </Button>
          <Link href="/admin/questions/new">
            <Button variant="primary" size="md">
              Ajouter une question
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white">
            Filtres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Module
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Tous</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                disabled={!selectedModule}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm disabled:opacity-50"
              >
                <option value="">Tous</option>
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Tous</option>
                <option value="mcq">QCM</option>
                <option value="true_false">Vrai/Faux</option>
                <option value="open_short">Ouverte courte</option>
                <option value="drag_drop">Drag & Drop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulté
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Tous</option>
                <option value="1">1 (Facile)</option>
                <option value="2">2 (Moyen)</option>
                <option value="3">3 (Difficile)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priorité
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Tous</option>
                <option value="1">1 (Basse)</option>
                <option value="2">2 (Moyenne)</option>
                <option value="3">3 (Haute)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""} trouvée{filteredQuestions.length !== 1 ? "s" : ""}
      </div>

      {filteredQuestions.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Aucune question trouvée
          </p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Extrait
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Module
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Chapitre
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Difficulté
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question) => (
                  <tr
                    key={question.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {question.question_text.substring(0, 60)}
                      {question.question_text.length > 60 ? "..." : ""}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="gray" className="font-mono">
                        {getModuleCode(question.module_id)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                      {getChapterTitle(question.chapter_id)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="emerald">
                        {questionTypeLabels[question.question_type]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {question.difficulty}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/questions/${question.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center gap-1"
                          >
                            Modifier
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicate(question)}
                          className="inline-flex items-center gap-1"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setDeleteDialog({ open: true, id: question.id })
                          }
                          className="inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4 text-coral-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        title="Supprimer la question"
        message="Êtes-vous sûr? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, id: "" })}
        loading={deleting}
      />
    </div>
  );
}

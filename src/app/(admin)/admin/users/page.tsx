"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/database";
import { AlertCircle } from "lucide-react";

const SUBSCRIPTION_LABELS: Record<string, string> = {
  free: "Gratuit",
  monthly: "Mensuel",
  yearly: "Annuel",
  lifetime: "Vie entière",
};

const SUBSCRIPTION_VARIANTS: Record<string, "coral" | "emerald" | "gray"> = {
  free: "gray",
  monthly: "emerald",
  yearly: "emerald",
  lifetime: "coral",
};

const ROLE_LABELS: Record<string, string> = {
  user: "Utilisateur",
  admin: "Administrateur",
};

const ROLE_VARIANTS: Record<string, "coral" | "emerald" | "gray"> = {
  user: "gray",
  admin: "coral",
};

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filterSubscription, setFilterSubscription] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const { error } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (data) {
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        error("Erreur lors du chargement des utilisateurs");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (searchName && !u.full_name.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    if (filterSubscription && u.subscription_status !== filterSubscription) {
      return false;
    }
    if (filterRole && u.role !== filterRole) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
          Utilisateurs
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {users.length} utilisateur{users.length !== 1 ? "s" : ""} inscrit{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Rechercher par nom"
            id="search"
            placeholder="Chercher..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <div>
            <label
              htmlFor="filter-subscription"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Filtrer par abonnement
            </label>
            <select
              id="filter-subscription"
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Tous</option>
              <option value="free">Gratuit</option>
              <option value="monthly">Mensuel</option>
              <option value="yearly">Annuel</option>
              <option value="lifetime">Vie entière</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-role"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Filtrer par rôle
            </label>
            <select
              id="filter-role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Tous</option>
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>
      </Card>

      {filteredUsers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucun utilisateur trouvé</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Nom
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Rôle
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Abonnement
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Date d&apos;inscription
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Dernière activité
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {user.full_name}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={ROLE_VARIANTS[user.role] || "gray"}>
                        {ROLE_LABELS[user.role] || user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          SUBSCRIPTION_VARIANTS[user.subscription_status] ||
                          "gray"
                        }
                      >
                        {SUBSCRIPTION_LABELS[user.subscription_status] ||
                          user.subscription_status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {new Date(user.updated_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

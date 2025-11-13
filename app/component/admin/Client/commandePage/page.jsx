"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  PackageCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

// Text Constants
const TEXT = {
  PAGE_TITLE: "My Orders",
  PAGE_SUBTITLE: "Track and manage your orders in real-time",
  ADD_COMMAND: "New Order",
  SEARCH_PLACEHOLDER: "Search an order...",
  EDIT: "Edit",
  DELETE: "Delete",
  CANCEL: "Cancel",
  SAVE: "Save",
  CREATE: "Create",
  CONFIRM_DELETE: "Confirm Deletion",
  PRODUCT: "Product",
  QUANTITY: "Quantity",
  TOTAL: "Total",
  STATUS: "Status",
  DATE: "Date",
  ACTIONS: "Actions",
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  NO_ORDERS: "No orders found",
  CURRENCY: "DZD",
};

export default function CommandesPage() {
  const { data: session } = useSession();
  const [commandes, setCommandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCommande, setCurrentCommande] = useState(null);
  const [commandeToDelete, setCommandeToDelete] = useState(null);
  const [formData, setFormData] = useState({
    adresse: "",
    emballage: "",
    quantite: 1,
    status: "PENDING",
    productId: "",
  });

  // 🧩 Fetch commandes from API
  const fetchCommandes = async () => {
    try {
      const res = await fetch("/api/Commande");
      const data = await res.json();
      if (res.ok) {
        // Filter only the current user's commandes
        const userEmail = session?.user?.email;
        const filtered = data.filter((c) => c.compte?.email === userEmail);
        setCommandes(filtered);
      } else {
        Swal.fire("Error", data.error || "Failed to load orders", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network error while loading orders", "error");
    }
  };

  useEffect(() => {
    if (session?.user?.email) fetchCommandes();
  }, [session]);

  // ➕ Add / ✏️ Edit
  const handleSubmit = async () => {
    try {
      if (!formData.productId || !formData.adresse) {
        Swal.fire("Missing data", "Please fill all required fields", "warning");
        return;
      }

      const method = currentCommande ? "PUT" : "POST";
      const body = currentCommande
        ? { id: currentCommande.id, ...formData }
        : { ...formData, compteId: session?.user?.id }; // include user

      const res = await fetch("/api/Commande", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire(
          "Success",
          currentCommande ? "Order updated!" : "Order created!",
          "success"
        );
        setIsDialogOpen(false);
        fetchCommandes();
      } else {
        Swal.fire("Error", data.error || "Failed to save order", "error");
      }
    } catch {
      Swal.fire("Error", "Network error while saving", "error");
    }
  };

  // 🗑️ Delete
  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/Commande?id=${commandeToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Deleted", "Order deleted successfully", "success");
        fetchCommandes();
      } else {
        Swal.fire("Error", data.error || "Failed to delete", "error");
      }
    } catch {
      Swal.fire("Error", "Network error while deleting", "error");
    } finally {
      setIsDeleteDialogOpen(false);
      setCommandeToDelete(null);
    }
  };

  const filteredCommandes = commandes.filter(
    (cmd) =>
      cmd.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.emballage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusConfig = (status) => {
    const configs = {
      PENDING: { label: TEXT.PENDING, color: "bg-yellow-100 text-yellow-800" },
      CONFIRMED: { label: TEXT.CONFIRMED, color: "bg-blue-100 text-blue-800" },
      IN_TRANSIT: {
        label: TEXT.IN_TRANSIT,
        color: "bg-purple-100 text-purple-800",
      },
      DELIVERED: {
        label: TEXT.DELIVERED,
        color: "bg-green-100 text-green-800",
      },
      CANCELLED: { label: TEXT.CANCELLED, color: "bg-red-100 text-red-800" },
    };
    return configs[status] || configs.PENDING;
  };

  const formatCurrency = (amount) =>
    `${amount.toLocaleString()} ${TEXT.CURRENCY}`;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-black mb-2">
            {TEXT.PAGE_TITLE}
          </h1>
          <p className="text-gray-600">{TEXT.PAGE_SUBTITLE}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={TEXT.SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => {
              setCurrentCommande(null);
              setFormData({
                adresse: "",
                emballage: "",
                quantite: 1,
                status: "PENDING",
                productId: "",
              });
              setIsDialogOpen(true);
            }}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            {TEXT.ADD_COMMAND}
          </Button>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCommandes.map((cmd) => {
            const statusConfig = getStatusConfig(cmd.status);
            return (
              <div
                key={cmd.id}
                className="border p-6 rounded-lg bg-white hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      {cmd.product?.title || "Unnamed Product"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {cmd.quantite} pcs — {cmd.emballage}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Address: {cmd.adresse}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(cmd.Date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge className={statusConfig.color}>
                      {statusConfig.label}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setCurrentCommande(cmd);
                          setFormData({
                            adresse: cmd.adresse,
                            emballage: cmd.emballage,
                            quantite: cmd.quantite,
                            status: cmd.status,
                            productId: cmd.productId,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setCommandeToDelete(cmd);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-red-600 border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCommandes.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">
              {TEXT.NO_ORDERS}
            </h3>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {currentCommande ? TEXT.EDIT : TEXT.CREATE}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <Label>Address *</Label>
                <Input
                  value={formData.adresse}
                  onChange={(e) =>
                    setFormData({ ...formData, adresse: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Packaging *</Label>
                <Input
                  value={formData.emballage}
                  onChange={(e) =>
                    setFormData({ ...formData, emballage: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantite}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantite: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">{TEXT.PENDING}</SelectItem>
                    <SelectItem value="CONFIRMED">{TEXT.CONFIRMED}</SelectItem>
                    <SelectItem value="IN_TRANSIT">
                      {TEXT.IN_TRANSIT}
                    </SelectItem>
                    <SelectItem value="DELIVERED">{TEXT.DELIVERED}</SelectItem>
                    <SelectItem value="CANCELLED">{TEXT.CANCELLED}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {TEXT.CANCEL}
              </Button>
              <Button onClick={handleSubmit} className="bg-black text-white">
                {currentCommande ? TEXT.SAVE : TEXT.CREATE}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Delete Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <b>{commandeToDelete?.product?.title}</b>? This cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

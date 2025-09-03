"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Checkbox } from "@web/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@web/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@web/components/ui/alert-dialog";
import { Plus, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DashboardCategoryCreateModal from "./[id]/DashboardCategoryCreateModal";

export default function ShadcnDashboardCategoryList() {
  const { trpc } = useTrpc();
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, 10)
  );
  const [showCategoryCreate, setShowCategoryCreate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  const categoryList = trpc.categoryRouter.findAll.useQuery({
    page,
    perPage,
  });
  
  const categoryRemove = trpc.categoryRouter.remove.useMutation();
  
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const toggleCategorySelection = (categoryId: number) => {
    setSelectedIds((prevSelectedIds: number[]) =>
      prevSelectedIds.includes(categoryId)
        ? prevSelectedIds.filter((id: number) => id !== categoryId)
        : [...prevSelectedIds, categoryId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (categoryList?.data) {
      if (checked) {
        setSelectedIds(categoryList.data.records?.map((category) => category.id) || []);
      } else {
        setSelectedIds([]);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length > 0) {
      await categoryRemove.mutateAsync({
        id: selectedIds,
      });
      setSelectedIds([]);
      toast("Removed");
      categoryList.refetch();
      setShowDeleteAlert(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription className="mt-1">
                  Add categories, edit and more.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {selectedIds?.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteAlert(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove ({selectedIds.length})
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => setShowCategoryCreate(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add category
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedIds.length === categoryList?.data?.records?.length &&
                        categoryList?.data?.records?.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Write Access</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList?.data?.records?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(category.id)}
                        onCheckedChange={() => toggleCategorySelection(category.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.sortOrder}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {category.adminWriteOnly ? "Admin" : "Everyone"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {format(category.createdAt, "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/categories/${category.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {(!categoryList?.data?.records || categoryList.data.records.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No categories found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="flex items-center gap-2">
                <Select
                  value={perPage.toString()}
                  onValueChange={(value) => setPerPage(parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(page - 1) * perPage + 1} -{" "}
                  {Math.min(page * perPage, categoryList?.data?.total || 0)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {categoryList?.data?.total || 0}
                </span>{" "}
                results
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === categoryList?.data?.lastPage}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Alert Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected
              {selectedIds.length > 1 ? ` ${selectedIds.length} categories` : " category"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Modal */}
      {showCategoryCreate && (
        <DashboardCategoryCreateModal
          onClose={() => {
            setShowCategoryCreate(false);
            categoryList.refetch();
          }}
        />
      )}
    </>
  );
}
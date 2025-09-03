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
import { Badge } from "@web/components/ui/badge";
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
import { Plus, Trash2, ChevronLeft, ChevronRight, Eye, CheckCircle } from "lucide-react";
import DashboardPostCreateModal from "./[id]/DashboardPostCreateModal";

export default function ShadcnDashboardPostList() {
  const { trpc } = useTrpc();
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, 10)
  );
  const [showPostCreate, setShowPostCreate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  const postList = trpc.postRouter.findAll.useQuery({
    page,
    perPage,
  });
  
  const postDelete = trpc.postRouter.delete.useMutation();
  
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const togglePostSelection = (postId: number) => {
    setSelectedIds((prevSelectedIds: number[]) =>
      prevSelectedIds.includes(postId)
        ? prevSelectedIds.filter((id: number) => id !== postId)
        : [...prevSelectedIds, postId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (postList?.data) {
      if (checked) {
        setSelectedIds(postList.data.records?.map((post) => post.id) || []);
      } else {
        setSelectedIds([]);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length > 0) {
      await postDelete.mutateAsync({
        id: selectedIds,
      });
      setSelectedIds([]);
      toast("Deleted");
      postList.refetch();
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
                <CardTitle>Posts</CardTitle>
                <CardDescription className="mt-1">
                  Add posts, edit and more.
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
                    Delete ({selectedIds.length})
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => setShowPostCreate(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add post
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
                        selectedIds.length === postList?.data?.records?.length &&
                        postList?.data?.records?.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postList?.data?.records?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(post.id)}
                        onCheckedChange={() => togglePostSelection(post.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {post.user.firstName} {post.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {post.user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {post.category?.name || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {format(post.createdAt, "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/posts/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {(!postList?.data?.records || postList.data.records.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No posts found</p>
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
                  {Math.min(page * perPage, postList?.data?.total || 0)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {postList?.data?.total || 0}
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
                  disabled={page === postList?.data?.lastPage}
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
              {selectedIds.length > 1 ? ` ${selectedIds.length} posts` : " post"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Modal */}
      {showPostCreate && (
        <DashboardPostCreateModal
          onClose={() => {
            setShowPostCreate(false);
            postList.refetch();
          }}
        />
      )}
    </>
  );
}
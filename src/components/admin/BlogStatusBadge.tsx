import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogStatusBadgeProps {
  status: "draft" | "publish" | "deleted";
  className?: string;
}

const BlogStatusBadge = ({ status, className }: BlogStatusBadgeProps) => {
  const statusConfig = {
    draft: {
      label: "Draft",
      color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
      dot: "bg-yellow-500",
    },
    publish: {
      label: "Published",
      color: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
      dot: "bg-green-500",
    },
    deleted: {
      label: "Deleted",
      color: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
      dot: "bg-red-500",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        "flex items-center gap-1.5 border",
        config.color,
        className
      )}
      variant="outline"
    >
      <span className={cn("w-2 h-2 rounded-full", config.dot)} />
      {config.label}
    </Badge>
  );
};

export default BlogStatusBadge;

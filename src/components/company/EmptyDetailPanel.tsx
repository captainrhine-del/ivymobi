import { Button } from "@/components/ui/button";

interface EmptyDetailPanelProps {
  fileCount: number;
}

export function EmptyDetailPanel({ fileCount }: EmptyDetailPanelProps) {
  return (
    <div className="p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-foreground">公司资料</h2>
        <Button size="sm" variant="default">
          导出文件列表
        </Button>
      </div>

      {/* Folder Placeholder */}
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          width="160"
          height="120"
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6"
        >
          {/* Folder back */}
          <path
            d="M20 30C20 24.4772 24.4772 20 30 20H55L70 35H130C135.523 35 140 39.4772 140 45V90C140 95.5228 135.523 100 130 100H30C24.4772 100 20 95.5228 20 90V30Z"
            fill="hsl(var(--folder))"
          />
          {/* Folder front */}
          <path
            d="M15 45C15 39.4772 19.4772 35 25 35H135C140.523 35 145 39.4772 145 45V95C145 100.523 140.523 105 135 105H25C19.4772 105 15 100.523 15 95V45Z"
            fill="hsl(var(--folder))"
            opacity="0.9"
          />
          {/* Folder highlight */}
          <path
            d="M15 50C15 44.4772 19.4772 40 25 40H135C140.523 40 145 44.4772 145 50V52H15V50Z"
            fill="hsl(var(--folder))"
            opacity="0.7"
          />
        </svg>
        
        <p className="text-sm text-muted-foreground">
          共{fileCount}个文件。
        </p>
      </div>
    </div>
  );
}

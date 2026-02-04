import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MemberDetailPanel } from "@/components/members/MemberDetailPanel";

interface Group {
  id: string;
  name: string;
  count: number;
}

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  groupId: string;
  avatar?: string;
  department?: string;
  position?: string;
  status?: string;
  groups?: string[];
  receiveNotifications?: boolean;
}

// Mock data
const mockGroups: Group[] = [
  { id: "1", name: "待审核", count: 0 },
  { id: "2", name: "未分组", count: 4 },
  { id: "3", name: "已激活", count: 18 },
  { id: "4", name: "已停用", count: 3 },
  { id: "5", name: "已拒绝", count: 1 },
  { id: "6", name: "管理员", count: 12 },
  { id: "7", name: "销售部", count: 4 },
  { id: "8", name: "项目部", count: 0 },
];

const mockMembers: Member[] = [
  { 
    id: "1", 
    name: "杨恒", 
    phone: "18500365676", 
    email: "yangh@ivymobi.com", 
    groupId: "3",
    department: "技术部",
    position: "技术总监",
    status: "已激活",
    groups: ["已激活", "管理员"],
    receiveNotifications: true
  },
  { 
    id: "2", 
    name: "柳婷", 
    phone: "13521424377", 
    email: "liut@ivymobi.com", 
    groupId: "3",
    department: "市场部",
    position: "市场经理",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: true
  },
  { 
    id: "3", 
    name: "CharlesDing", 
    phone: "18600812345", 
    email: "dingchen@ivymobi.com", 
    groupId: "3",
    department: "",
    position: "董事长CEO",
    status: "已激活",
    groups: ["已激活", "管理员"],
    receiveNotifications: false
  },
  { 
    id: "4", 
    name: "张昱", 
    phone: "17602256151", 
    email: "zhangy@ivymobi.com", 
    groupId: "3",
    department: "研发部",
    position: "高级工程师",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: true
  },
  { 
    id: "5", 
    name: "许洪涛", 
    phone: "18611742312", 
    email: "xuht@ivymobi.com", 
    groupId: "3",
    department: "销售部",
    position: "销售总监",
    status: "已激活",
    groups: ["已激活", "销售部"],
    receiveNotifications: true
  },
  { 
    id: "6", 
    name: "liyang", 
    phone: "13141055806", 
    email: "87384094@sina.com", 
    groupId: "6",
    department: "运营部",
    position: "运营经理",
    status: "已激活",
    groups: ["管理员"],
    receiveNotifications: true
  },
  { 
    id: "7", 
    name: "杨经理", 
    phone: "18510994288", 
    email: "yangxy@ivymobi.com", 
    groupId: "7",
    department: "销售部",
    position: "区域经理",
    status: "已激活",
    groups: ["销售部"],
    receiveNotifications: true
  },
  { 
    id: "8", 
    name: "张毅华", 
    phone: "13701330580", 
    email: "zhangyh@ivymobi.com", 
    groupId: "3",
    department: "财务部",
    position: "财务主管",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: false
  },
  { 
    id: "9", 
    name: "马年林", 
    phone: "18600260781", 
    email: "manl@ivymobi.com", 
    groupId: "3",
    department: "人力资源",
    position: "HR经理",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: true
  },
  { 
    id: "10", 
    name: "田钢", 
    phone: "15810505520", 
    email: "tg@ivymobi.com", 
    groupId: "3",
    department: "技术部",
    position: "前端工程师",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: true
  },
  { 
    id: "11", 
    name: "刘承亮", 
    phone: "18363623719", 
    email: "383237767@qq.com", 
    groupId: "3",
    department: "技术部",
    position: "后端工程师",
    status: "已激活",
    groups: ["已激活"],
    receiveNotifications: false
  },
];

export default function Members() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(mockGroups[2]); // Default to "已激活"
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupMembers = selectedGroup 
    ? mockMembers.filter(m => m.groupId === selectedGroup.id)
    : [];

  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
    setSelectedMember(null); // Clear member selection when changing groups
  };

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left Panel - Group List */}
        <div className="w-[320px] border-r border-border flex flex-col bg-card shrink-0">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b border-border flex-wrap">
            <h1 className="text-lg font-medium text-foreground mr-auto">成员管理</h1>
            <Button size="sm" className="text-xs h-8">
              导出成员列表
            </Button>
            <Button size="sm" className="text-xs h-8">
              邀请成员
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-8">
              新建群组
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Group Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium">群组名称</TableHead>
                  <TableHead className="text-right font-medium">人数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow
                    key={group.id}
                    className={cn(
                      "cursor-pointer",
                      selectedGroup?.id === group.id && "bg-accent"
                    )}
                    onClick={() => handleGroupSelect(group)}
                  >
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell className="text-right">{group.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Middle Panel - Member List */}
        <div className="flex-1 flex flex-col bg-background min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-medium text-foreground">
              {selectedGroup?.name || "选择群组"}
            </h2>
          </div>

          {/* Member Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium">姓名</TableHead>
                  <TableHead className="font-medium">手机号</TableHead>
                  <TableHead className="font-medium">email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupMembers.length > 0 ? (
                  groupMembers.map((member) => (
                    <TableRow 
                      key={member.id} 
                      className={cn(
                        "cursor-pointer",
                        selectedMember?.id === member.id 
                          ? "bg-accent" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => handleMemberSelect(member)}
                    >
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{member.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={3} className="h-48 text-center text-muted-foreground">
                      暂无数据...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-4 p-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {groupMembers.length} of {groupMembers.length}
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 py-1 text-sm font-medium">1</span>
              <button className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Member Detail */}
        <MemberDetailPanel 
          member={selectedMember} 
          groupName={selectedGroup?.name}
        />
      </div>
    </AdminLayout>
  );
}

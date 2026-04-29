export type Champion = {
  championName: string;
  championImg: string;
  cost: number;
  position?: { row: number; col: number };
};

export type Item = {
  itemName: string;
  itemImg: string;
  position?: { row: number; col: number };
};

export type Comment = {
  _id: string;
  username: string;
  content: string;
  createdAt: string;
};

export type CompSpec = {
  _id: string;
  title: string;
  username: string;
  champions: Champion[];
  tips: string;
  howToTransition: string;
  createdAt: string;
  heartCount: number;
  liked: boolean;
  bookmarked: boolean;
  commentCount: number;
  comments: Comment[];
};

export type BuilderBoardProps = {
  champions: Champion[];
  onDropToCell?: (row: number, col: number) => void;
  onDragFromCell?: (row: number, col: number) => void;
  dragOverCell?: { row: number; col: number } | null;
  onDragOverCell?: (row: number, col: number) => void;
  onDragLeave?: () => void;
  onDragEnd?: () => void;
};

export type BoardProps = BuilderBoardProps & {
  interactive?: boolean;
};

export type PageOptions = {
  page: number;
  size: number;
};

export type SortDirection = 'asc' | 'desc' | null | undefined;

export type SortOptions = {
  field?: string;
  sort?: SortDirection;
};

export type FilterOptions = {
  filter?: string;
};

export type QueryOptions = {
  baseUrl: string;
  pageOptions: PageOptions;
  sortOptions?: SortOptions[];
  filterOptions?: FilterOptions;
};

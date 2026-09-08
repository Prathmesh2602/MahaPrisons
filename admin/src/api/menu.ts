import { apiClient } from './client';

export interface MenuItem {
  id: string;
  parentId: string | null;
  labelMr: string;
  labelEn: string;
  href: string;
  icon: string | null;
  order: number;
  isMegaGroup: boolean;
  visible: boolean;
  pageId?: string;
  children?: MenuItem[];
}

export const getMenuTree = async (): Promise<MenuItem[]> => {
  return apiClient('/menu');
};

export const createMenuItem = async (data: Partial<MenuItem>) => {
  return apiClient('/menu', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
  return apiClient(`/menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const reorderMenuItems = async (items: { id: string; order: number; parentId: string | null }[]) => {
  return apiClient('/menu/reorder', {
    method: 'PUT',
    body: JSON.stringify({ items }),
  });
};

export const deleteMenuItem = async (id: string) => {
  return apiClient(`/menu/${id}`, {
    method: 'DELETE',
  });
};

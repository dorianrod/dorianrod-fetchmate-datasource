import { QueryEditorProps } from './types';

export const usePromptsManager = ({ onChange, query }: Pick<QueryEditorProps, 'onChange' | 'query'>) => {
  const prompts = query.prompts ?? [''];
  return {
    prompts,
    update: (index: number, value: string) => {
      const updatedPrompts = [...prompts];
      updatedPrompts[index] = value ?? '';
      onChange({ ...query, prompts: updatedPrompts });
    },
    deleteAt: (index: number) => {
      const updatedPrompts = [...prompts];
      updatedPrompts.splice(index, 1);
      onChange({ ...query, prompts: updatedPrompts });
    },
    add: () => {
      const updatedPrompts = [...(prompts ?? []), ''];
      onChange({ ...query, prompts: updatedPrompts });
    },
  };
};

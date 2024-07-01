import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const MyPopover = () => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button className="px-4 py-2 bg-purple-400 text-white rounded">Open Popover</button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content className="p-4 bg-white runded shadow-lg">
        <div>This is the popover content!</div>
        <PopoverPrimitive.Arrow className="fill-current text-white" />
        <PopoverPrimitive.Close asChild>
          <button className="mt-2 px-2 py-1 bg-pink-600 text-white rounded">Close</button>
        </PopoverPrimitive.Close>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

export {MyPopover};
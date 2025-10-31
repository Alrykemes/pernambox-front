import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  let barColor = "bg-primary"
  if (value && props.max) {
    if (value < 0) {
      value = 0
    }
    if (value > props.max) {
      value = props.max
    }

    if (value / props.max < 0.3) {
      barColor = "bg-red-500"
    } else if (value / props.max < 0.8) {
      barColor = "bg-yellow-500"
    } else {
      barColor = "bg-green-500"
    }
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${barColor} h-full w-full flex-1 transition-all`}
        style={{ transform: `translateX(-${(props.max || 100) - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

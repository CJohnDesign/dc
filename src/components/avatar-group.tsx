import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createRandomUsers, type FakeUser } from "@/utils/faker"
import { cn } from "@/lib/cn"

interface AvatarGroupProps {
  users?: FakeUser[]
  count?: number
  maxDisplay?: number
  overlapPercent?: number
  className?: string
  showRemainder?: boolean
}

export function AvatarGroup({ 
  users,
  count = 5,
  maxDisplay = 5,
  overlapPercent = 30,
  className,
  showRemainder = true
}: AvatarGroupProps) {
  // Use provided users or generate random ones
  const displayUsers = users || createRandomUsers(count)
  
  // Determine how many to display and if there's remainder
  const displayCount = Math.min(displayUsers.length, maxDisplay)
  const remainingCount = displayUsers.length - displayCount
  
  return (
    <div className={cn("flex flex-row justify-center", className)}>
      {displayUsers.slice(0, displayCount).map((user, index) => (
        <div 
          key={index}
          className="flex flex-row justify-start rounded-full ring-2 ring-background transition-transform hover:translate-y-1"
          style={{ 
            marginLeft: index === 0 ? 0 : `-${overlapPercent}%`,
            zIndex: displayCount - index,
            width: '40px',
            height: '40px'
          }}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={`${user.name || 'User'}`} />
            <AvatarFallback className="text-xs">
              {user.name ? user.name.substring(0, 2).toUpperCase() : `U${index}`}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
      
      {showRemainder && remainingCount > 0 && (
        <div 
          className="relative rounded-full ring-2 ring-background bg-muted flex items-center justify-center"
          style={{ 
            marginLeft: `-${overlapPercent}%`,
            zIndex: 0,
            width: '40px',
            height: '40px'
          }}
        >
          <span className="text-xs font-medium">+{remainingCount}</span>
        </div>
      )}
    </div>
  )
}
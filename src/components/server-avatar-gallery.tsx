import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createRandomUsers } from "@/utils/faker"
interface ServerAvatarGalleryProps {
  count?: number
}

export function ServerAvatarGallery({ count = 5 }: ServerAvatarGalleryProps) {
  const users = createRandomUsers(count)

  return (
    <div className="flex gap-2 flex-wrap">
      {users.map((user, index) => (
        <Avatar key={index}>
          <AvatarImage src={user.avatar} alt={`User ${index + 1}`} />
          <AvatarFallback>
            {user.name ? user.name.substring(0, 2).toUpperCase() : `U${index}`}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
} 
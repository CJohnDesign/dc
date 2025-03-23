"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createRandomUsers, type FakeUser } from "@/utils/faker"

interface AvatarGalleryProps {
  count?: number
}

export function AvatarGallery({ count = 5 }: AvatarGalleryProps) {
  const [users, setUsers] = useState<FakeUser[]>([])

  useEffect(() => {
    setUsers(createRandomUsers(count))
  }, [count])

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
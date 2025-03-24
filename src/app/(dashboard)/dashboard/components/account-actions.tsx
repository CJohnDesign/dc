import React from 'react'
import { EmptyWalletIcon, InquiriesIcon, RevolvingCreditIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const accountActionsData = [
  {
    actionName: "Individual Credit UI",
    actionIcon: EmptyWalletIcon,
    actionDetail: "Individual TL off over 30%",
    actionBadge: "High Impact"
  },
  {
    actionName: "Inquiries",
    actionIcon: InquiriesIcon, 
    actionDetail: "High inquiry count",
    actionBadge: "Mid Impact"
  },
  {
    actionName: "Highest Revolving Limit",
    actionIcon: RevolvingCreditIcon,
    actionDetail: "Highest rev credit limit under OK",
    actionBadge: "Low Impact"
  }
]

function AccountActions() {
  return (
    <div className="grid gap-4">
      {accountActionsData.map((action, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex items-center gap-4">
            <action.actionIcon className="w-12 h-12" />
            <div className="space-y-1">
              <h3 className="font-medium">{action.actionName}</h3>
              <p className="text-sm text-muted-foreground">{action.actionDetail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge 
              variant={
                action.actionBadge === "High Impact" ? "destructive" :
                action.actionBadge === "Mid Impact" ? "secondary" : 
                "outline"
              }
            >
              {action.actionBadge}
            </Badge>
            <Button variant="outline">How to Fix this</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountActions;
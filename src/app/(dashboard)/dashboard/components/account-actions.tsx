import React from 'react'
import { EmptyWalletIcon, InquiriesIcon, RevolvingCreditIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'
import { SearchCheck, ShieldCheck, CreditCard } from 'lucide-react'

const accountActionsData = [
  {
    actionName: "Individual Credit UI",
    actionIcon: EmptyWalletIcon,
    actionDetail: "Individual TL off over 30%",
    actionBadge: "High Impact",
    description: "Your individual credit utilization is significantly high. This means you're using more than 30% of your available credit on individual accounts, which can negatively impact your credit score.",
    recommendations: [
      {
        title: "Pay down all TL to 30% or lower",
        description: "Pay down by borrowing from friends, family, private lenders"
      },
      {
        title: "Apply for a new credit card",
        description: "Apply for new credit card(s), shift rev debt to new card to pay down your high usage. Caution: recommended to have a min. credit score of 700 before applying."
      },
      {
        title: "Add a credit partner or co-signer",
        description: "Apply for new credit card(s), shift rev debt to new card to pay down your high usage. Caution: recommended to have a min. credit score of 700 before applying."
      },
      {
        title: "Balance transfer",
        description: "Balance transfer from one card (personal/business) with high usage to another card with low usage to end up your credit balance ratios. Recommended to have all revolving accounts under 30% usage before applying."
      }
    ],
    compensatingFactors: [
      {
        icon: SearchCheck,
        title: "Low Inquiry Count",
        description: "You have no recent credit inquiries. Having one or two inquiries won't significantly impact your score"
      },
      {
        icon: ShieldCheck,
        title: "No Derogatory Remarks",
        description: "Great job! You have no derogatory remarks on your credit score"
      },
      {
        icon: CreditCard,
        title: "Highest Revolving Account",
        description: "Highest revolving account is below 30%. this is a great way to improve your credit score"
      }
    ],
    vendors: [
      {
        image: "/marketing/bnb-build.png",
        title: "BNB Credit Builders",
        description: "We provide you with the education, tools and guidance you need to understand and maintain your credit rating now and in the future.",
        learnMoreLink: "#"
      },
      {
        image: "/marketing/credit-boost.png",
        title: "Credit Rent Boost",
        description: "Report Rent & Improve Credit — Raise Your Credit Score by Paying Rent on Time. Get Started for as little as $2.50/month!",
        learnMoreLink: "#"
      },
      {
        image: "/marketing/skool.png",
        title: "Skool",
        description: "Put your courses, communities, & event schedules together in one place. Try Skool for free. Skool groups are more engaging: your daily active members will be 10x higher. Get started now. Memberships. Subscription memberships.",
        learnMoreLink: "#"
      }
    ]
  },
  {
    actionName: "Inquiries",
    actionIcon: InquiriesIcon, 
    actionDetail: "High inquiry count",
    actionBadge: "Mid Impact",
    description: "You have a high number of recent credit inquiries. Multiple credit applications in a short period can signal financial risk to lenders and temporarily lower your credit score."
  },
  {
    actionName: "Highest Revolving Limit",
    actionIcon: RevolvingCreditIcon,
    actionDetail: "Highest rev credit limit under OK",
    actionBadge: "Low Impact",
    description: "Your highest revolving credit limit is below optimal levels. Having credit accounts with higher limits can improve your overall credit utilization ratio and demonstrate creditworthiness to lenders."
  }
]

function AccountActions() {
  const [activeTab, setActiveTab] = useState('recommendations')

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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">How to Fix this</Button>
              </SheetTrigger>
              <SheetContent className="p-6 sm:max-w-2xl">
                <div className="flex items-center justify-between mb-6 px-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{action.actionName}</h2>
                    <p className="text-sm text-muted-foreground">{action.actionDetail}</p>
                  </div>
                  <Badge variant="destructive" className="ml-4">High Impact</Badge>
                </div>
                
                <div className="flex gap-2 mb-6 border-b pb-4">
                  <Badge 
                    className={`px-4 py-1.5 cursor-pointer ${
                      activeTab === 'recommendations' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setActiveTab('recommendations')}
                  >
                    Recommendations
                  </Badge>
                  <Badge 
                    className={`px-4 py-1.5 cursor-pointer ${
                      activeTab === 'compensating' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setActiveTab('compensating')}
                  >
                    Compensating Factors
                  </Badge>
                  <Badge 
                    className={`px-4 py-1.5 cursor-pointer ${
                      activeTab === 'vendors' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setActiveTab('vendors')}
                  >
                    Vendors
                  </Badge>
                </div>
                
                {activeTab === 'recommendations' ? (
                  <>
                    <div className="mb-6">
                      <Image 
                        src="/marketing/start-here.png"
                        alt="Getting Started with Deliver Capital"
                        width={600}
                        height={300}
                        className="rounded-lg w-full object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      {action.recommendations?.map((rec, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2" />
                          <div className="space-y-2">
                            <h3 className="font-medium text-sm">{rec.title}</h3>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : activeTab === 'compensating' ? (
                  <div className="grid gap-4">
                    {action.compensatingFactors?.map((factor, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="bg-indigo-100 rounded-full p-4">
                            <factor.icon className="w-10 h-10 text-indigo-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">{factor.title}</h3>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                ) : activeTab === 'vendors' ? (
                  <div className="space-y-6">
                    {action.vendors?.map((vendor, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-6 flex items-start gap-6">
                        <div className="flex-shrink-0 w-32 h-32 relative">
                          <Image
                            src={vendor.image}
                            alt={vendor.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="font-medium text-lg">{vendor.title}</h3>
                          <p className="text-sm text-muted-foreground">{vendor.description}</p>
                          <a 
                            href={vendor.learnMoreLink}
                            className="text-sm text-primary hover:underline inline-block"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountActions;
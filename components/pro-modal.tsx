"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import {  ChatBubbleIcon, ImageIcon, VideoIcon, SpeakerLoudIcon, CodeIcon, CheckIcon, CheckCircledIcon, LightningBoltIcon  } from "@radix-ui/react-icons"

import { Badge } from "@/components/ui/badge";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const tools = [
    {
      label: "Conversation",
      icon: ChatBubbleIcon,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/conversation"
    },
    {
      label: "Music Gen",
      icon: SpeakerLoudIcon,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      href: "/music"
    },
    {
      label: "Image Gen",
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      href: "/image"
    },
    {
      label: "Video Gen",
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      href: "/video"
    },
    {
      label: "Code Gen",
      icon: CodeIcon,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      href: "/code"
    }
  ]

export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR")
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pd-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to KnotzGPT
                        <Badge variant="premium" className="uppercase text-sm py-1">
                            Plus+
                        </Badge>

                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card 
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6",  tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <CheckCircledIcon className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={onSubscribe}
                        size="lg"
                        variant="premium"
                        className="w-full"
                    >
                        Upgrade
                        <LightningBoltIcon className="w-4 h-4 ml-2 fill-white"/>
                            
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
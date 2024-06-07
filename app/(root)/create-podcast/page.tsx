"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import Loader from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx' ]


const formSchema = z.object({
  podcastTitle: z.string(),
  podcastDescription: z.string(),
});

const CreatePodcast = () => {
  const router = useRouter();
  
  const [imagePrompt, setImagePrompt] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageUrl, setImageUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [voicePrompt, setVoicePrompt] = useState('')
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast()

  const createPodcast = useMutation(api.podcasts.createPodcast)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if(!audioUrl || !imageUrl || !voiceType){
        toast({
          title: "Please generate audio and image",
          variant: "destructive"
        })
        setIsSubmitting(false);
        throw new Error("Please generate audio and image")
      }
      await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt, 
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!
      })
      toast({
        title: "Podcast created succesfully"
      })
      setIsSubmitting(false);
      router.push('/');
    } catch (error) {
      console.log("error creating podcast", error);
      toast({
        title: "Please fill all the fields and try again",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">create podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5 ">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Podcaster"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1')}>
                  <SelectValue className="placeholder:text-gray-1" placeholder="Select AI voice" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus-visible:ring-offset-orange-1">
                  {voiceCategories.map((category) => (<SelectItem className="capitalize focus:bg-orange-1" key={category} value={category}>{category}</SelectItem>))}
                  
                </SelectContent>
                {voiceType && (<audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />)}
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5 ">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                  <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a podcast Description" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast 
            setAudioStorageId= {setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType}
            audio = {audioUrl}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail setImage = {setImageUrl}
             setImageStorageId = {setImageStorageId}
              image = {imageUrl}
               imagePrompt = {imagePrompt}
                setImagePrompt  = {setImagePrompt}
                /> 
            <div className="mt-10 w-full">
              <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">{isSubmitting ? (<>submitting</>): ("submit and publish podcast")}</Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;

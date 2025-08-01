import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/chat-client";
import PDFViewer from "@/components/pdfviewer";

interface ChatIdPageProps {
    params: {
        chatId: string;
    }
};

const ChatIdPage = async ({params}:ChatIdPageProps) => {
    const {userId} = auth();

    if (!userId){
        return redirectToSignIn();
    }

    const document = await prismadb.document.findUnique({
        where: {id: params.chatId},
        include: {
            messages: {
                orderBy: {createdAt: "asc"},
                where: {
                    userId
                }
            },
            _count: {
                select: {messages: true}
            }
        }
    },);

    if (!document){
        return redirect("/");
    }

    return (
    <div className="flex justify-center align-middle h-full w-full">
    <PDFViewer remoteUrl={document.fileurl} />
    <ChatClient document={document} />
    </div>

);
}

export default ChatIdPage;

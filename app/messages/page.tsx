import { Message } from "@prisma/client";

export default function Messages() {
  const handleClick = async () => {
    
    const newMessage: Omit<Message, "id"> = {
      title: "test title",
      description: "test description",
    }
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({content: "Hello, world!"})
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">Messages</h1>
      <form name="postNewMessageForm" action="">
        <input type="text" name="title" required />
        <input type="text" name="description" required />
        <input type="submit" />
      </form>
    </main>
  )
}
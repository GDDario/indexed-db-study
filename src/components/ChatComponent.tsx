import {useState} from 'react';

interface Message {
  id: number;
  text: string;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, {text: input, id: Date.now()}]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="w-full h-[400px] bg-gray-100 rounded-lg shadow-md overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] self-end"
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex gap-4 w-full">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Send
        </button>
      </div>
    </>
  );
}
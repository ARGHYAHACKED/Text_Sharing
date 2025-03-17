import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Copy } from 'lucide-react';
import api from '../lib/axios';
import { TextShare } from '../types';

export default function View() {
  const { slug } = useParams<{ slug: string }>();
  const [text, setText] = useState<TextShare | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await api.get(`/api/texts/${slug}`);
        setText(response.data);
      } catch (error) {
        toast.error('Failed to load text');
      } finally {
        setIsLoading(false);
      }
    };

    fetchText();
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!text) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Text Not Found</h2>
          <p className="text-gray-600">This text share link might have been deleted or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shared Text</h2>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </button>
        </div>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{text.content}</pre>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Created {new Date(text.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
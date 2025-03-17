import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Share2 } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Home() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Share Text Securely and Anonymously
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create and share text snippets with anyone, while maintaining control over your content.
        </p>
        {user ? (
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            <FileText className="w-5 h-5 mr-2" />
            Create New Text
          </Link>
        ) : (
          <div className="space-y-4">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Share2 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
          <p className="text-gray-600">
            Generate unique links for your text content and share them instantly with anyone.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileText className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Private Access</h3>
          <p className="text-gray-600">
            Only people with the link can access your content. No public listings or search indexing.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileText className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Full Control</h3>
          <p className="text-gray-600">
            Edit or delete your shared content at any time. You're always in control.
          </p>
        </div>
      </div>
    </div>
  );
}
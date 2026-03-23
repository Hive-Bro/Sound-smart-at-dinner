import { useState } from 'react';

export default function SettingsPanel({ apiKey, onSave, onClose }) {
  const [key, setKey] = useState(apiKey || '');

  const handleSave = () => {
    onSave(key.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-white mb-1">Settings</h2>
        <p className="text-sm text-gray-400 mb-4">
          Your API key is stored in your browser only and sent directly to Anthropic's API.
        </p>

        <label className="block text-sm font-medium text-gray-300 mb-1">
          Anthropic API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-blue-500 mb-1"
        />
        <p className="text-xs text-gray-500 mb-5">
          Without an API key, you'll still see stories but no AI synthesis.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

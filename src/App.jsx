import React, { useState, useEffect } from 'react';
import { Sparkles, Play, CheckCircle2, Loader2, History, Settings2, FileCode } from 'lucide-react';
import SpecUploader from './components/SpecUploader';
import RepoSelector from './components/RepoSelector';
import Filters from './components/Filters';
import TestFileCard from './components/TestFileCard';

// Stubbed data for initial state
const STUB_FILES = [
  {
    fileName: 'test_get_pet_by_id.py',
    endpointId: 'GET /pet/{petId}',
    action: 'Created',
    timestamp: '2 mins ago',
    code: `import pytest
import requests

# AUTO-GENERATED: Payload and assertions
def test_get_pet_by_id():
    url = "https://petstore.swagger.io/v2/pet/1"
    response = requests.get(url)
    # Validate positive response
    assert response.status_code == 200
    assert response.json()["id"] == 1
# END AUTO-GENERATED`
  },
  {
    fileName: 'test_update_pet.py',
    endpointId: 'PUT /pet',
    action: 'Updated',
    timestamp: '5 mins ago',
    code: `import pytest
import requests

# AUTO-GENERATED: Payload and assertions
def test_update_pet():
    url = "https://petstore.swagger.io/v2/pet"
    payload = {"id": 1, "name": "doggie", "status": "sold"}
    response = requests.put(url, json=payload)
    # Ensure update was successful
    assert response.status_code == 200
# END AUTO-GENERATED`
  },
  {
    fileName: 'test_delete_pet_negative.py',
    endpointId: 'DELETE /pet/{petId}',
    action: 'Created',
    timestamp: 'Just now',
    code: `import pytest
import requests

# AUTO-GENERATED: Payload and assertions
def test_delete_non_existent_pet():
    url = "https://petstore.swagger.io/v2/pet/999999"
    response = requests.delete(url)
    # Should fail with 404
    assert response.status_code == 404
# END AUTO-GENERATED`
  },
  {
    fileName: 'test_get_pet_skipped.py',
    endpointId: 'GET /pet/findByStatus',
    action: 'Skipped',
    timestamp: '1 hour ago',
    code: "# No changes detected in API schema for this endpoint. Skipping update."
  }
];

function App() {
  const [specContent, setSpecContent] = useState('');
  const [repoPath, setRepoPath] = useState('/Users/user/projects/my-api-tests');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

  const handleSpecUpdate = (content, validationError) => {
    setSpecContent(content);
    setError(validationError);
  };

  const handleGenerate = async () => {
    if (!specContent) {
      setError('Please provide an OpenAPI specification first.');
      return;
    }
    if (error) return;

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spec_content: specContent,
          repo_path: repoPath,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to generate tests');
      }

      const data = await response.json();
      setFiles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.endpointId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'All' || file.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">API TestGen</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Automated API Testing</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
              <History className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
              <Settings2 className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-slate-300">Backend Connected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Config */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Input Configuration</h3>
              <div className="space-y-6">
                <SpecUploader
                  onSpecContent={handleSpecUpdate}
                  error={error}
                />
                <RepoSelector
                  repoPath={repoPath}
                  setRepoPath={setRepoPath}
                />

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isGenerating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-hover text-white shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Tests...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      Generate Tests
                    </>
                  )}
                </button>
              </div>
            </section>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 border-dashed">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">Status Pro-Tip</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Make sure your local repository has write permissions. Negative tests are generated by default for all validation schemas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generation Results</h3>
              {files.length > 0 && (
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">
                  {filteredFiles.length} {filteredFiles.length === 1 ? 'FILE' : 'FILES'}
                </span>
              )}
            </div>

            {files.length === 0 ? (
              <div className="h-96 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-slate-500 text-center px-10">
                <div className="relative mb-6">
                  <FileCode className="w-16 h-16 opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <History className="w-8 h-8 animate-pulse text-slate-700" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-slate-300 mb-2">No tests generated yet</h4>
                <p className="text-sm text-slate-500 max-w-xs">
                  Configure your OpenAPI spec and repository path on the left to start generating high-quality API tests.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Filters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterAction={filterAction}
                  setFilterAction={setFilterAction}
                />

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file, index) => (
                      <TestFileCard key={index} file={file} />
                    ))
                  ) : (
                    <div className="py-20 text-center text-slate-500">
                      <p>No results match your current filters.</p>
                      <button
                        onClick={() => { setSearchTerm(''); setFilterAction('All'); }}
                        className="text-primary text-sm font-medium mt-2 hover:underline"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          <span>&copy; 2026 API TestGen Forge</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">v0.1.0-alpha</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

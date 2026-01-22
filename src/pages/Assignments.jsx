import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Download, Upload, X } from 'lucide-react';

const initialAssignmentsList = [
    {
        id: 1,
        title: 'Data Structures: Linked Lists Implementation',
        course: 'CS 201 - Data Structures',
        description: 'Implement a complete singly linked list with insert, delete, and search operations.',
        dueDate: '2026-02-14',
        submittedDate: '2026-02-12',
        status: 'submitted',
        grade: 'A',
        feedback: 'Excellent implementation with clear documentation.',
        files: ['assignment1.pdf', 'linked_list.cpp'],
        submissionFiles: ['linked_list_final.cpp', 'test_cases.cpp', 'report.pdf'],
        weight: 10,
    },
    {
        id: 2,
        title: 'Database Design Project',
        course: 'CS 301 - Database Management',
        description: 'Design and implement a relational database for an e-commerce platform.',
        dueDate: '2026-03-15',
        submittedDate: null,
        status: 'pending',
        grade: null,
        feedback: null,
        files: ['project_requirements.pdf', 'schema_template.sql'],
        submissionFiles: [],
        weight: 15,
    },
    {
        id: 3,
        title: 'Web Development: React Component Library',
        course: 'CS 401 - Web Development',
        description: 'Create a reusable React component library with documentation and examples.',
        dueDate: '2026-03-20',
        submittedDate: null,
        status: 'in-progress',
        grade: null,
        feedback: null,
        files: ['component_specs.md', 'starter_code.zip'],
        submissionFiles: [],
        weight: 20,
    },
    {
        id: 4,
        title: 'Algorithm Analysis Essay',
        course: 'CS 251 - Algorithms',
        description: 'Write an essay comparing time and space complexity of sorting algorithms.',
        dueDate: '2026-02-28',
        submittedDate: '2026-02-27',
        status: 'submitted',
        grade: 'A-',
        feedback: 'Well-structured analysis. Consider more real-world examples.',
        files: ['essay_guidelines.pdf'],
        submissionFiles: ['algorithms_essay.docx'],
        weight: 8,
    },
    {
        id: 5,
        title: 'Operating Systems: Shell Implementation',
        course: 'CS 350 - Operating Systems',
        description: 'Implement a basic command shell with piping and redirection support.',
        dueDate: '2026-04-05',
        submittedDate: null,
        status: 'pending',
        grade: null,
        feedback: null,
        files: ['shell_requirements.txt', 'sample_shell.c'],
        submissionFiles: [],
        weight: 25,
    },
    {
        id: 6,
        title: 'Machine Learning: Regression Model',
        course: 'CS 421 - Machine Learning',
        description: 'Build and evaluate a regression model on provided dataset.',
        dueDate: '2026-04-12',
        submittedDate: null,
        status: 'in-progress',
        grade: null,
        feedback: null,
        files: ['dataset.csv', 'starter_notebook.ipynb'],
        submissionFiles: [],
        weight: 15,
    },
];

const Assignments = () => {
    const [filter, setFilter] = useState('all');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [assignmentsList, setAssignmentsList] = useState(initialAssignmentsList);

    const [submissionData, setSubmissionData] = useState({
        file: null,
        message: '',
    });

    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        if (!submissionData.file) {
            alert('Please select a file to submit');
            return;
        }

        const updatedAssignments = assignmentsList.map(a =>
            a.id === selectedAssignment.id
                ? { ...a, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0], submissionFiles: [...a.submissionFiles, submissionData.file.name] }
                : a
        );

        setAssignmentsList(updatedAssignments);
        setSelectedAssignment(updatedAssignments.find(a => a.id === selectedAssignment.id));
        setSubmissionData({ file: null, message: '' });
        setShowSubmitForm(false);
        alert('Assignment submitted successfully!');
    };

    const handleDownload = (fileName) => {
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,Mock%20file:%20${encodeURIComponent(fileName)}`);
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'submitted': return 'bg-green-100 text-green-800 border-green-300';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'overdue': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'submitted': return <CheckCircle size={18} />;
            case 'pending': return <Clock size={18} />;
            case 'in-progress': return <FileText size={18} />;
            case 'overdue': return <AlertCircle size={18} />;
            default: return null;
        }
    };

    const filteredAssignments = assignmentsList.filter((assignment) => {
        if (filter === 'all') return true;
        return assignment.status === filter;
    });

    const overallProgress = Math.round(
        (assignmentsList.filter(a => a.status === 'submitted').length / assignmentsList.length) * 100
    );

    return (
        <div className='py-8'>
            <PageHeader title='Assignments' subtitle='Track and manage your coursework.' />

            <div className='max-w-6xl mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Total</p>
                                <p className='text-3xl font-bold text-slate-800'>{assignmentsList.length}</p>
                            </div>
                            <FileText size={32} className='text-blue-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Submitted</p>
                                <p className='text-3xl font-bold text-slate-800'>{assignmentsList.filter(a => a.status === 'submitted').length}</p>
                            </div>
                            <CheckCircle size={32} className='text-green-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>In Progress</p>
                                <p className='text-3xl font-bold text-slate-800'>{assignmentsList.filter(a => a.status === 'in-progress').length}</p>
                            </div>
                            <Clock size={32} className='text-yellow-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Pending</p>
                                <p className='text-3xl font-bold text-slate-800'>{assignmentsList.filter(a => a.status === 'pending').length}</p>
                            </div>
                            <AlertCircle size={32} className='text-purple-500 opacity-20' />
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <div className='flex items-center justify-between mb-3'>
                        <h3 className='font-semibold text-slate-800'>Overall Progress</h3>
                        <span className='text-2xl font-bold text-blue-600'>{overallProgress}%</span>
                    </div>
                    <div className='w-full bg-slate-200 rounded-full h-3'>
                        <div className='bg-indigo-600 h-3 rounded-full transition-all duration-300' style={{ width: `${overallProgress}%` }} />
                    </div>
                </div>

                <div className='flex gap-2 mb-6 flex-wrap'>
                    {['all', 'submitted', 'in-progress', 'pending'].map((s) => (
                        <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg font-medium transition capitalize ${filter === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:border-indigo-600'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                <div className='space-y-4'>
                    {filteredAssignments.map((assignment) => (
                        <div key={assignment.id} onClick={() => setSelectedAssignment(assignment)} className='bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-300 hover:shadow-lg hover:border-indigo-600 transition cursor-pointer'>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h3 className='text-lg font-bold text-slate-800'>{assignment.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(assignment.status)}`}>
                                            {assignment.status}
                                        </span>
                                    </div>
                                    <p className='text-sm text-slate-600 mb-2'>{assignment.course}</p>
                                    <div className='flex gap-6 text-sm text-slate-600'>
                                        <div className='flex items-center gap-2'><Calendar size={16} /> Due: {assignment.dueDate}</div>
                                        <div className='flex items-center gap-2'>Weight: {assignment.weight}%</div>
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setSelectedAssignment(assignment); setShowSubmitForm(true); }} className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedAssignment && !showSubmitForm && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8'>
                        <div className='flex justify-between items-start mb-6'>
                            <h2 className='text-2xl font-black text-slate-900'>{selectedAssignment.title}</h2>
                            <button onClick={() => setSelectedAssignment(null)} className='text-slate-400 hover:text-slate-900'>
                                <X size={24} />
                            </button>
                        </div>
                        <p className='text-slate-600 mb-8'>{selectedAssignment.description}</p>
                        <div className='grid grid-cols-2 gap-4 mb-8'>
                            <div className='bg-slate-50 p-4 rounded-2xl'>
                                <p className='text-[10px] font-black uppercase text-slate-400 mb-1'>Due Date</p>
                                <p className='font-bold text-slate-900'>{selectedAssignment.dueDate}</p>
                            </div>
                            <div className='bg-slate-50 p-4 rounded-2xl'>
                                <p className='text-[10px] font-black uppercase text-slate-400 mb-1'>Status</p>
                                <p className='font-bold text-indigo-600 uppercase tracking-widest text-xs'>{selectedAssignment.status}</p>
                            </div>
                        </div>
                        <button onClick={() => setShowSubmitForm(true)} className='w-full py-4 bg-slate-900 text-white rounded-2xl font-black tracking-widest hover:bg-slate-800 transition-all'>
                            PROCEED TO SUBMISSION
                        </button>
                    </div>
                </div>
            )}

            {showSubmitForm && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-3xl shadow-xl max-w-md w-full p-8'>
                        <div className='flex justify-between items-start mb-6'>
                            <h2 className='text-2xl font-black text-slate-900'>Submit Work</h2>
                            <button onClick={() => setShowSubmitForm(false)} className='text-slate-400 hover:text-slate-900'>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitAssignment} className='space-y-6'>
                            <div>
                                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>Upload Document</label>
                                <input type='file' onChange={(e) => setSubmissionData({ ...submissionData, file: e.target.files?.[0] || null })} className='w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all' />
                            </div>
                            <button type='submit' className='w-full py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-widest hover:bg-indigo-700 transition-all'>
                                SEND SUBMISSION
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
export { initialAssignmentsList };

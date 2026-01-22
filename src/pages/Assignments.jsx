import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Download, Upload, X } from 'lucide-react';

const Assignments = () => {
    const [filter, setFilter] = useState('all');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    // Later: replace with API data
    const [assignmentsList, setAssignmentsList] = useState([
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
    ]);

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
        // Simulate file download
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,Mock%20file:%20${encodeURIComponent(fileName)}`);
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const assignments = assignmentsList;


    const getStatusColor = (status) => {
        switch (status) {
            case 'submitted':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'overdue':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'submitted':
                return <CheckCircle size={18} />;
            case 'pending':
                return <Clock size={18} />;
            case 'in-progress':
                return <FileText size={18} />;
            case 'overdue':
                return <AlertCircle size={18} />;
            default:
                return null;
        }
    };

    const filteredAssignments = assignments.filter((assignment) => {
        if (filter === 'all') return true;
        if (filter === 'submitted') return assignment.status === 'submitted';
        if (filter === 'pending') return assignment.status === 'pending';
        if (filter === 'in-progress') return assignment.status === 'in-progress';
        return true;
    });

    const overallProgress = Math.round(
        (assignments.filter(a => a.status === 'submitted').length / assignments.length) * 100
    );

    return (
        <div className='py-8'>
            <PageHeader title='Assignments' subtitle='Track and manage your coursework.' />

            <div className='max-w-6xl mx-auto px-4'>
                {/* Overview Stats */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Total Assignments</p>
                                <p className='text-3xl font-bold text-slate-800'>{assignments.length}</p>
                            </div>
                            <FileText size={32} className='text-blue-500 opacity-20' />
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Submitted</p>
                                <p className='text-3xl font-bold text-slate-800'>
                                    {assignments.filter(a => a.status === 'submitted').length}
                                </p>
                            </div>
                            <CheckCircle size={32} className='text-green-500 opacity-20' />
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>In Progress</p>
                                <p className='text-3xl font-bold text-slate-800'>
                                    {assignments.filter(a => a.status === 'in-progress').length}
                                </p>
                            </div>
                            <Clock size={32} className='text-yellow-500 opacity-20' />
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Pending</p>
                                <p className='text-3xl font-bold text-slate-800'>
                                    {assignments.filter(a => a.status === 'pending').length}
                                </p>
                            </div>
                            <AlertCircle size={32} className='text-purple-500 opacity-20' />
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <div className='flex items-center justify-between mb-3'>
                        <h3 className='font-semibold text-slate-800'>Overall Progress</h3>
                        <span className='text-2xl font-bold text-blue-600'>{overallProgress}%</span>
                    </div>
                    <div className='w-full bg-slate-200 rounded-full h-3'>
                        <div
                            className='bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300'
                            style={{ width: `${overallProgress}%` }}
                        />
                    </div>
                    <p className='text-sm text-slate-600 mt-2'>
                        {assignments.filter(a => a.status === 'submitted').length} of {assignments.length} assignments completed
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className='flex gap-2 mb-6 flex-wrap items-center justify-start'>
                    {['all', 'submitted', 'in-progress', 'pending'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                                filter === status
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-500'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Assignments List */}
                <div className='space-y-4'>
                    {filteredAssignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            onClick={() => setSelectedAssignment(assignment)}
                            className='bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-300 hover:shadow-lg hover:border-blue-500 transition cursor-pointer'
                        >
                            <div className='flex items-start justify-between gap-4'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h3 className='text-lg font-bold text-slate-800'>{assignment.title}</h3>
                                        <span
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                assignment.status
                                            )}`}
                                        >
                                            {getStatusIcon(assignment.status)}
                                            {assignment.status.replace('-', ' ')}
                                        </span>
                                    </div>
                                    <p className='text-sm text-slate-600 mb-2'>{assignment.course}</p>
                                    <p className='text-sm text-slate-600 mb-3'>{assignment.description}</p>

                                    <div className='flex gap-6 text-sm text-slate-600'>
                                        <div className='flex items-center gap-2'>
                                            <Calendar size={16} />
                                            Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            Weight: {assignment.weight}%
                                        </div>
                                        {assignment.status === 'submitted' && assignment.grade && (
                                            <div className='flex items-center gap-2 font-semibold text-green-600'>
                                                Grade: {assignment.grade}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='text-right'>
                                    {assignment.status === 'submitted' ? (
                                        <button 
                                            onClick={() => setSelectedAssignment(assignment)}
                                            className='px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium'
                                        >
                                            View Details
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => {
                                                setSelectedAssignment(assignment);
                                                setShowSubmitForm(true);
                                            }}
                                            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium flex items-center gap-2 ml-auto'
                                        >
                                            <Upload size={16} /> Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAssignments.length === 0 && (
                    <div className='text-center py-12 bg-white rounded-lg shadow-md'>
                        <p className='text-slate-500'>No assignments found in this category.</p>
                    </div>
                )}
            </div>

            {/* Assignment Detail Modal */}
            {selectedAssignment && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto'>
                        <div className='p-8'>
                            <div className='flex items-start justify-between mb-4'>
                                <div>
                                    <h2 className='text-2xl font-bold text-slate-800 mb-2'>{selectedAssignment.title}</h2>
                                    <p className='text-slate-600'>{selectedAssignment.course}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedAssignment(null)}
                                    className='text-slate-400 hover:text-slate-600 text-2xl'
                                >
                                    ✕
                                </button>
                            </div>

                            <p className='text-slate-600 mb-6'>{selectedAssignment.description}</p>

                            <div className='grid grid-cols-2 gap-4 mb-6'>
                                <div className='bg-slate-50 p-4 rounded-lg'>
                                    <p className='text-xs text-slate-600 font-semibold uppercase'>Due Date</p>
                                    <p className='text-lg font-bold text-slate-800'>
                                        {new Date(selectedAssignment.dueDate).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div className='bg-slate-50 p-4 rounded-lg'>
                                    <p className='text-xs text-slate-600 font-semibold uppercase'>Status</p>
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border mt-2 ${getStatusColor(
                                            selectedAssignment.status
                                        )}`}
                                    >
                                        {getStatusIcon(selectedAssignment.status)}
                                        {selectedAssignment.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h4 className='font-semibold text-slate-800 mb-3'>Assignment Files</h4>
                                <div className='space-y-2'>
                                    {selectedAssignment.files.map((file, idx) => (
                                        <div key={idx} className='flex items-center gap-2 p-3 bg-slate-50 rounded hover:bg-slate-100 transition'>
                                            <FileText size={18} className='text-blue-500' />
                                            <span className='text-sm text-slate-700 flex-1'>{file}</span>
                                            <button
                                                onClick={() => handleDownload(file)}
                                                className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition flex items-center gap-1'
                                            >
                                                <Download size={14} /> Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedAssignment.status === 'submitted' && selectedAssignment.submissionFiles.length > 0 && (
                                <div className='mb-6'>
                                    <h4 className='font-semibold text-slate-800 mb-3'>Your Submissions</h4>
                                    <div className='space-y-2'>
                                        {selectedAssignment.submissionFiles.map((file, idx) => (
                                            <div key={idx} className='flex items-center gap-2 p-3 bg-green-50 rounded hover:bg-green-100 transition'>
                                                <FileText size={18} className='text-green-500' />
                                                <span className='text-sm text-slate-700 flex-1'>{file}</span>
                                                <button
                                                    onClick={() => handleDownload(file)}
                                                    className='px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition flex items-center gap-1'
                                                >
                                                    <Download size={14} /> Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedAssignment.status === 'submitted' && selectedAssignment.feedback && (
                                <div className='bg-green-50 border border-green-300 rounded-lg p-4 mb-6'>
                                    <h4 className='font-semibold text-green-800 mb-2'>Feedback</h4>
                                    <p className='text-sm text-green-700'>{selectedAssignment.feedback}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedAssignment(null)}
                                className='w-full px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition font-medium'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Assignment Modal */}
            {showSubmitForm && selectedAssignment && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-lg shadow-lg max-w-md w-full'>
                        <div className='p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className='text-2xl font-bold text-slate-800'>Submit Assignment</h2>
                                <button
                                    onClick={() => setShowSubmitForm(false)}
                                    className='text-slate-400 hover:text-slate-600 text-2xl'
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitAssignment} className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                                        Assignment: {selectedAssignment.title}
                                    </label>
                                    <p className='text-xs text-slate-600'>{selectedAssignment.course}</p>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                                        Upload File *
                                    </label>
                                    <input
                                        type='file'
                                        onChange={(e) => setSubmissionData({ ...submissionData, file: e.target.files?.[0] || null })}
                                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500'
                                    />
                                    {submissionData.file && <p className='text-xs text-green-600 mt-1'>✓ {submissionData.file.name}</p>}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                                        Comments (Optional)
                                    </label>
                                    <textarea
                                        value={submissionData.message}
                                        onChange={(e) => setSubmissionData({ ...submissionData, message: e.target.value })}
                                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500'
                                        placeholder='Add any comments about your submission...'
                                        rows='3'
                                    />
                                </div>

                                <div className='flex gap-2 pt-4'>
                                    <button
                                        type='submit'
                                        className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium flex items-center justify-center gap-2'
                                    >
                                        <Upload size={16} /> Submit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setShowSubmitForm(false)}
                                        className='flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition font-medium'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;

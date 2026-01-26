import { useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Download, Upload, X } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';

const statusColors = {
    submitted: 'bg-green-100 text-green-800 border-green-300',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    overdue: 'bg-red-100 text-red-800 border-red-300',
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

const formatDate = (date) => {
    if (!date) return 'No due date set';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toISOString().split('T')[0];
};

const normalizeAssignment = (assignment) => {
    const submissions = assignment?.submissions || [];
    const status = submissions.length > 0 ? 'submitted' : 'pending';

    const courseName = assignment?.course?.courseName
        || assignment?.course?.name
        || assignment?.courseName
        || assignment?.course
        || 'Course';

    const courseCode = assignment?.course?.courseCode
        || assignment?.course?.code
        || assignment?.courseCode
        || assignment?.code
        || assignment?.course_id
        || 'N/A';

    return {
        ...assignment,
        id: assignment?._id || assignment?.id,
        title: assignment?.title || 'Untitled Assignment',
        description: assignment?.description || '',
        courseName,
        courseCode,
        dueDate: assignment?.dueDate || assignment?.deadline || assignment?.due || '',
        submissions,
        submissionFiles: submissions
            .map((s) => s?.fileUrl || s?.file || s?.fileName)
            .filter(Boolean),
        status,
        __raw: assignment,
    };
};

const Assignments = () => {
    const { assignments, loading, error, submitAssignment, fetchSubmissionById } = useAssignments();

    const [filter, setFilter] = useState('all');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [submissionData, setSubmissionData] = useState({ courseCode: '', rollNo: '', fileUrl: '' });
    const [submitting, setSubmitting] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const normalizedAssignments = useMemo(() => {
        const map = new Map();
        assignments.forEach((assignment) => {
            const normalized = normalizeAssignment(assignment);
            const key = normalized.id || `${normalized.title}-${normalized.courseCode}`;
            if (!map.has(key)) {
                map.set(key, normalized);
            }
        });
        return Array.from(map.values());
    }, [assignments]);

    const filteredAssignments = normalizedAssignments.filter((assignment) => {
        if (filter === 'all') return true;
        return assignment.status === filter;
    });

    const overallProgress = normalizedAssignments.length === 0
        ? 0
        : Math.round(
            (normalizedAssignments.filter((a) => a.status === 'submitted').length / normalizedAssignments.length) * 100
        );

    const handleAssignmentSelect = async (assignment) => {
        setFeedback(null);
        setDetailLoading(false);

        // Show the card immediately with whatever data we already have.
        const normalized = normalizeAssignment(assignment);
        setSelectedAssignment(normalized);
        setSubmissionData((prev) => ({
            ...prev,
            courseCode: normalized.courseCode !== 'N/A' ? normalized.courseCode : '',
        }));

        // Only try to fetch details when the API supports it; swallow errors to avoid noisy UI.
        if (!assignment?._id) return;

        try {
            setDetailLoading(true);
            const fullData = await fetchSubmissionById(assignment._id);
            const normalizedFull = normalizeAssignment(fullData || assignment);
            setSelectedAssignment(normalizedFull);
            setSubmissionData((prev) => ({
                ...prev,
                courseCode: normalizedFull.courseCode !== 'N/A' ? normalizedFull.courseCode : prev.courseCode,
            }));
        } catch (err) {
            console.warn('Assignment detail fetch failed:', err);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleSubmitAssignment = async (e) => {
        e.preventDefault();
        if (!selectedAssignment) return;
        if (!submissionData.courseCode || !submissionData.rollNo || !submissionData.fileUrl) {
            setFeedback({ type: 'error', text: 'Course code, roll number, and file URL are required.' });
            return;
        }

        setSubmitting(true);
        setFeedback(null);
        try {
            const response = await submitAssignment({
                courseCode: submissionData.courseCode
                    || selectedAssignment.__raw?.course?.courseCode
                    || selectedAssignment.__raw?.courseCode
                    || selectedAssignment.courseCode,
                rollNo: submissionData.rollNo,
                fileUrl: submissionData.fileUrl,
            });

            console.log('Assignment submission response:', response);
            setFeedback({ type: 'success', text: response?.message || 'Assignment submitted successfully' });
            setShowSubmitForm(false);
            setSubmissionData({ courseCode: '', rollNo: '', fileUrl: '' });
        } catch (err) {
            console.error('Submission error:', err);
            setFeedback({ type: 'error', text: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='py-8'>
            <PageHeader title='Assignments' subtitle='Track and manage your coursework.' />

            <div className='max-w-6xl mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Total</p>
                                <p className='text-3xl font-bold text-slate-800'>{normalizedAssignments.length}</p>
                            </div>
                            <FileText size={32} className='text-blue-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Submitted</p>
                                <p className='text-3xl font-bold text-slate-800'>{normalizedAssignments.filter(a => a.status === 'submitted').length}</p>
                            </div>
                            <CheckCircle size={32} className='text-green-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>In Progress</p>
                                <p className='text-3xl font-bold text-slate-800'>{normalizedAssignments.filter(a => a.status === 'in-progress').length}</p>
                            </div>
                            <Clock size={32} className='text-yellow-500 opacity-20' />
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-slate-600 text-sm'>Pending</p>
                                <p className='text-3xl font-bold text-slate-800'>{normalizedAssignments.filter(a => a.status === 'pending').length}</p>
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

                {feedback && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {feedback.text}
                    </div>
                )}

                {error && (
                    <div className='mb-4 px-4 py-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200'>
                        {error}
                    </div>
                )}

                <div className='flex gap-2 mb-6 flex-wrap'>
                    {['all', 'submitted', 'in-progress', 'pending'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${filter === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:border-indigo-600'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {feedback && feedback.type === 'error' && (
                    <div className='mb-4 px-4 py-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200'>
                        {feedback.text}
                    </div>
                )}

                {loading ? (
                    <div className='bg-white rounded-lg shadow-md p-6 text-center text-slate-500'>
                        Loading assignments...
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {filteredAssignments.length === 0 ? (
                            <div className='bg-white rounded-lg shadow-md p-6 text-center text-slate-500'>
                                No assignments available yet.
                            </div>
                        ) : (
                            filteredAssignments.map((assignment) => (
                                <div
                                    key={assignment.id}
                                    onClick={() => handleAssignmentSelect(assignment)}
                                    className='bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-300 hover:shadow-lg hover:border-indigo-600 transition cursor-pointer'
                                >
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <div className='flex items-center gap-3 mb-2'>
                                                <h3 className='text-lg font-bold text-slate-800'>{assignment.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[assignment.status] || 'bg-slate-100 text-slate-800 border-slate-300'}`}>
                                                    {assignment.status}
                                                </span>
                                            </div>
                                            <p className='text-sm text-slate-600 mb-2'>{assignment.courseName} ({assignment.courseCode})</p>
                                            <div className='flex gap-6 text-sm text-slate-600'>
                                                <div className='flex items-center gap-2'><Calendar size={16} /> Due: {formatDate(assignment.dueDate)}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleAssignmentSelect(assignment); setShowSubmitForm(true); }}
                                            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
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
                                <p className='font-bold text-slate-900'>{formatDate(selectedAssignment.dueDate)}</p>
                            </div>
                            <div className='bg-slate-50 p-4 rounded-2xl'>
                                <p className='text-[10px] font-black uppercase text-slate-400 mb-1'>Status</p>
                                <p className='font-bold text-indigo-600 uppercase tracking-widest text-xs flex items-center gap-2'>
                                    {getStatusIcon(selectedAssignment.status)}
                                    {selectedAssignment.status}
                                </p>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <h4 className='text-xs font-black uppercase text-slate-400 mb-2'>Submission Files</h4>
                            {selectedAssignment.submissionFiles?.length ? (
                                <div className='flex flex-wrap gap-2'>
                                    {selectedAssignment.submissionFiles.map((file, idx) => (
                                        <span key={idx} className='px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs flex items-center gap-2'>
                                            <Download size={14} />
                                            {file}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-slate-500 text-sm'>No submissions yet.</p>
                            )}
                        </div>
                        <button
                            disabled={detailLoading}
                            onClick={() => setShowSubmitForm(true)}
                            className='w-full py-4 bg-slate-900 text-white rounded-2xl font-black tracking-widest hover:bg-slate-800 transition-all disabled:opacity-60'
                        >
                            {detailLoading ? 'Loading...' : 'Proceed to Submission'}
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
                                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>Course Code</label>
                                <input
                                    type='text'
                                    value={submissionData.courseCode}
                                    onChange={(e) => setSubmissionData({ ...submissionData, courseCode: e.target.value })}
                                    className='w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all'
                                    placeholder='e.g., CSE103'
                                />
                            </div>
                            <div>
                                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>Roll Number</label>
                                <input
                                    type='text'
                                    value={submissionData.rollNo}
                                    onChange={(e) => setSubmissionData({ ...submissionData, rollNo: e.target.value })}
                                    className='w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all'
                                    placeholder='e.g., 25Y001'
                                />
                            </div>
                            <div>
                                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>File URL</label>
                                <input
                                    type='url'
                                    value={submissionData.fileUrl}
                                    onChange={(e) => setSubmissionData({ ...submissionData, fileUrl: e.target.value })}
                                    className='w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all'
                                    placeholder='https://example.com/my-assignment.pdf'
                                />
                                <p className='text-xs text-slate-500 mt-2 flex items-center gap-2'>
                                    <Upload size={14} /> Paste a publicly accessible link to your submission.
                                </p>
                            </div>
                            <button
                                type='submit'
                                disabled={submitting}
                                className='w-full py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-60'
                            >
                                {submitting ? 'Submitting...' : 'Send Submission'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;

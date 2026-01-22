import PageHeader from '../components/layout/PageHeader';

const Exams = () => (
    <div className='py-8'>
        <PageHeader title='Examinations' subtitle='View your exam schedule and results.' />
        <div className='flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50'>
            <p className='text-slate-400 font-medium tracking-wide italic'>Exams module under development...</p>
        </div>
    </div>
);

export default Exams;

import PageHeader from '../components/layout/PageHeader';

const Calender = () => (
    <div className='py-8'>
        <PageHeader title='Academic Calender' subtitle='Upcoming university calender' />
        <div className='flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50'>
            <p className='text-slate-400 font-medium tracking-wide italic'>Events module under development...</p>
        </div>
    </div>
);

export default Calender;

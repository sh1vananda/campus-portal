import PageHeader from '../components/layout/PageHeader';

const Timetable = () => (
    <div className='py-8'>
        <PageHeader title='Timetable' subtitle='Module is currently under development.' />
        <div className='flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50'>
            <p className='text-slate-400 font-medium tracking-wide italic'>Work in progress...</p>
        </div>
    </div>
);

export default Timetable;

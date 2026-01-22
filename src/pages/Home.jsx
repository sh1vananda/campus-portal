import PageHeader from '../components/layout/PageHeader';

const Home = () => {
    return (
        <div className="py-8">
            <PageHeader
                title="Home"
                subtitle="University Campus Portal Overview."
            />
            <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                <p className="text-slate-400 font-medium tracking-wide italic">
                    Modular components under construction...
                </p>
            </div>
        </div>
    );
};

export default Home;

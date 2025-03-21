import {Balls, MetronomeButton, SettingsForm} from "@/features/metronome";


export default function Home() {

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center gap-4">
                <Balls/>
                <MetronomeButton/>
                <SettingsForm/>
            </div>

        </div>
    );
}

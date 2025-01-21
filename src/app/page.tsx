import {Balls, BarRoll, MetronomeButton, SettingsForm} from "@/features/metronome";


export default function Home() {

    return (
        <div className="container mx-auto">
            <div className="grid gap-4">
                <Balls/>
                <MetronomeButton/>
                <BarRoll/>
                <SettingsForm/>
            </div>

        </div>
    );
}

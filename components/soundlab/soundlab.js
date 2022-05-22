export default class soundlab{
    /**
     * @param {string} Source -   The FoundryVTT/URL path to our play file
     * @param {number} Volume - A number from 0.1 to 1.0, default is 1.
     * @param {boolean} start - Start the sound, default is true
     * @param {boolean} repeat -  Loop this sound, default false
     */    
         static play(Source, Volume, start, repeat){
            try {
                let _source = Source;
                let _volume = Volume;
                let _start = start;
                let _repeat = repeat;
    
                if (_source === null){
                    _source = 'sounds/drums.wav';
                };
                if (_volume === null){
                    _volume = 1.0;
                    console.log('zandora-lib: There is no volume specified')
                };
                if (_start === null){
                    _start = true;
                };
                if (_repeat === null){
                    _repeat = false;
                };
                AudioHelper.play({src: _source, volume: _volume, autoplay: _start, loop: _repeat}, true);
            } catch (error) {
                
            }
            
        };

}
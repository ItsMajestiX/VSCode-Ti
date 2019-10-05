export namespace Module {
    function FS_createDataFile(directory: string, filename: string, data: Buffer | ArrayBuffer | Uint8Array | string, flag1: boolean, flag2: boolean): any;
    enum TIFeatureFlags
    {
        has82things  = 0b00000001,
        hasComplex   = 0b00000010,
        hasFlash     = 0b00000100,
        hasApps      = 0b00001000,
        hasClock     = 0b00010000,
        hasColorLCD  = 0b00100000,
        hasEZ80CPU   = 0b01000000,
        hasExactMath = 0b10000000
    }

    interface var_header_t {
        signature: Uint8Array
        sig_extra: Uint8Array
        comment: Uint8Array
        entries_len: number
    }

    interface var_entry_t {
        meta_length: number
        data_length: number
        typeID: number
        varname: Uint8Array
        version: number
        archivedFlag: number
        data_length2: number
        data: Uint8Array
    }

    class BinaryFile {
        constructor()
        constructor(filePath: string)
        constructor(o: BinaryFile)

        get_raw_bytes(): any
        get_string_bytes(bytes: number): string
        size(): any
        close(): undefined
    }

    class TIVarFile extends BinaryFile {
        getHeader(): var_header_t
        getVarEntry(): var_entry_t
        getType(): TIVarType
        getInstanceChecksum(): number

        static loadFromFile(filePath: string): TIVarFile

        static createNew(type: TIVarType): TIVarFile
        static createNew(type: TIVarType, name: string): TIVarFile
        static createNew(type: TIVarType, name: string, model: TIModel): TIVarFile

        makeHeaderFromFile(): undefined
        makeVarEntryFromFile(): undefined

        getChecksumValueFromFile(): number

        setContentFromData(data: any): undefined

        setContentFromString(str: string, options: [string, number]): undefined
        setContentFromString(str: string): undefined

        setCalcModel(model: TIModel): undefined
        setVarName(name: string): undefined
        setArchived(flag: boolean): undefined

        isCorrupt(): boolean

        getRawContent(): any

        getReadableContent(options: any): undefined
        getReadableContent(): undefined

        saveVarToFile(directory: string, name: string): string
        saveVarToFile(): string
    }
    class TIVarType {
        constructor()
        //too many jumps for handlers_pair_t
        constructor(id: number, name: string, exts: Array<string>, handlers: any)

        getID(): number
        getName(): string
        getExts(): Array<string>
        getHandlers(): any

        static createFromID(id: number): TIVarType
        static createFromName(name: string): TIVarType 
    }
    class TIModel {
        constructor()

        constructor(orderID: number, name: string, flags: number, sig:string)

        getOrderId(): number
        getName(): string
        getFlags(): number
        getSig(): string

        supportsType(type: TIVarType): boolean

        static createFromFlags(flags: number): TIModel

        static createFromName(name: string): TIModel

        static createFromSignature(sig: string): TIModel
    }
}

export default Module

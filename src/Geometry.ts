
export class Geometry {
    private vertexes: Float32Array;
    private colors: number[];
    private indexes: Uint16Array;

    public bufferNeeded: boolean;

    public setVertexes(vertexes: Float32Array) {
        this.vertexes = vertexes;
        this.bufferNeeded = true;
    }

    public getVertexes() { return this.vertexes.slice(); }

    public setColors(r: number, g: number, b: number, a: number) {
        this.colors = [r, g, b, a];
    }

    public getColors() { return this.colors; }

    public setIndexes(indexes: Uint16Array) {
        this.indexes = indexes;
        this.bufferNeeded = true;
    }

    public getIndexes() { return this.indexes; }
}

export class Geometry {
    private vertexes: Float32Array;
    private indexes: Uint16Array;
    private normals: Float32Array;

    public bufferNeeded: boolean;

    public setVertexes(vertexes: Float32Array) {
        this.vertexes = vertexes;
        this.bufferNeeded = true;
    }
    public getVertexes() { return this.vertexes.slice(); }

    public setIndexes(indexes: Uint16Array) {
        this.indexes = indexes;
        this.bufferNeeded = true;
    }
    public getIndexes() { return this.indexes; }

    public setNormals(normals: Float32Array) {
        this.normals = normals
    }
    public getNormals() {
        return this.normals;
    }

    public autoNorm() {
        
        let norms: number[] = [];

        for(var t_index = 0; t_index < this.indexes.length; t_index += 3) {
            let A = this.getVec3(this.indexes[t_index + 0]);
            let B = this.getVec3(this.indexes[t_index + 1]);
            let C = this.getVec3(this.indexes[t_index + 2]);
            
            let normal = this.vec3Norm(this.vec3Cross(this.vec3Subtract(B, A), this.vec3Subtract(C, A)));

            this.stuffNormal(norms, normal);
        }

        this.normals = new Float32Array(norms);
    }

    private stuffNormal(normals: number[], normal: number[]){
        normals.push(normal[0]);
        normals.push(normal[1]);
        normals.push(normal[2]);
    }

    private getVec3(index: number) {
        return [
            this.vertexes[index * 3 + 0],
            this.vertexes[index * 3 + 1],
            this.vertexes[index * 3 + 2],
        ]
    }

    private vec3Subtract(A: number[], B: number[]) {
        return [A[0] - B[0],
                A[1] - B[1],
                A[2] - B[2],]
    }

    private vec3Cross(A: number[], B: number[]) {
        return [
            (A[1] * B[2] - A[2] * B[1]),
            (A[2] * B[0] - A[0] * B[2]),
            (A[0] * B[1] - A[1] * B[0]),
        ]
    }

    private vec3Norm(vec3: number[]): number[] {
        let vec3Mag = Math.sqrt(vec3[0] * vec3[0] + vec3[1] * vec3[1] + vec3[2] * vec3[2]);
        vec3[0] = vec3[0] / vec3Mag;
        vec3[1] = vec3[1] / vec3Mag;
        vec3[2] = vec3[2] / vec3Mag;
        return vec3;
    }

    public recompute() {
        
        let nNormals: number[] = [];
        let nPos: number[] = [];
        for(var t_index = 0; t_index < this.indexes.length; t_index += 3) {
            let A = this.getVec3(this.indexes[t_index + 0]);
            let B = this.getVec3(this.indexes[t_index + 1]);
            let C = this.getVec3(this.indexes[t_index + 2]);

            let normal = this.vec3Norm(this.vec3Cross(this.vec3Subtract(B, A), this.vec3Subtract(C, A)));


            nPos = nPos.concat(A);
            nPos = nPos.concat(B);
            nPos = nPos.concat(C);

            nNormals = nNormals.concat(normal);
            nNormals = nNormals.concat(normal);
            nNormals = nNormals.concat(normal);
        }

        this.normals = new Float32Array(nNormals);
        this.vertexes = new Float32Array(nPos);
        this.bufferNeeded = true;

        console.log(this.normals, this.vertexes)
    }
}
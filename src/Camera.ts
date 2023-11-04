import { Transform } from "./Transform";

export class Camera {

    //Camera transform
    public transform: Transform = new Transform;

    private CameraToProjection = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);

    /**
     * Computes a CamerToProJectionMatrix
     * @param fov Field of view in degrees
     * @param aspectRatio The proportion of width and height    
     * @param near The near clipping plane
     * @param far The far clipping plane
     * 
     * @source https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection#simple_projection
     */
    public setCameraToProjectionMatrix(fov: number, aspectRatio: number, near: number, far: number) {
        let fovRad = fov * Math.PI/180;
        let f = 1.0/ Math.tan(Math.PI * .5 - .5 * fovRad);
        let rangInv = 1.0 / (near - far);

        this.CameraToProjection[0] = f / aspectRatio;
        this.CameraToProjection[5] = f;
        this.CameraToProjection[10] = (near + far) * rangInv;
        this.CameraToProjection[11] = -1;
        this.CameraToProjection[14] = near * far * rangInv * 2;
    }

    public getCameraToProjectionMatrix() { return this.CameraToProjection; }
    
    public getWorldToCameraMatrix() {

        let rotations = this.transform.getRotation();
        let translations = this.transform.getTranslation();
        let tempTransform = new Transform();

        //Invert the cameras transform.
        tempTransform.setRotation(-rotations[0], -rotations[1], -rotations[2]);
        tempTransform.setTranslation(-translations[0], -translations[1], -translations[2]);

        return tempTransform.computeTransformMatrix();
    }

}
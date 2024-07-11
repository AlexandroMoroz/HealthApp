

import * as runtime from '../runtime';
import type {
  RolRequest,
} from '../models/index';
import {
    RolRequestFromJSON,
    RolRequestToJSON,
} from '../models/index';

export interface CrearRolRequest {
    rolRequest: RolRequest;
}

export interface ModificarRolRequest {
    idRol: number;
    rolRequest: RolRequest;
}

/**
 * 
 */
export class RolApi extends runtime.BaseAPI {

    /**
     */
    async crearRolRaw(requestParameters: CrearRolRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['rolRequest'] == null) {
            throw new runtime.RequiredError(
                'rolRequest',
                'Required parameter "rolRequest" was null or undefined when calling crearRol().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/rol/crear-rol`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RolRequestToJSON(requestParameters['rolRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async crearRol(requestParameters: CrearRolRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.crearRolRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async modificarRolRaw(requestParameters: ModificarRolRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['idRol'] == null) {
            throw new runtime.RequiredError(
                'idRol',
                'Required parameter "idRol" was null or undefined when calling modificarRol().'
            );
        }

        if (requestParameters['rolRequest'] == null) {
            throw new runtime.RequiredError(
                'rolRequest',
                'Required parameter "rolRequest" was null or undefined when calling modificarRol().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['idRol'] != null) {
            queryParameters['idRol'] = requestParameters['idRol'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/rol/modificar-rol`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RolRequestToJSON(requestParameters['rolRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async modificarRol(requestParameters: ModificarRolRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.modificarRolRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

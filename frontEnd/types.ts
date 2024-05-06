import {HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';

export interface Options {
    headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?:
        | HttpParams
        | {
        [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?:
        | {
        includeHeaders?: string[];
    }
        | boolean;
}

export interface Biens {
    items: Bien[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface Bien {
    idBien: number;
    commune: string;
    rue: string;
    cp: string;
    nbCouchages: number;
    nbChambres: number;
    distance: number;
    prix: number;
    mail: string;
    image: string;
    averageAvis: number;
    lat: number;
    lng: number;
}


export interface PaginationParams {
    [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;

    page: number;
    perPage: number;
}

export interface Credentials {
    login: string;
    password: string
}
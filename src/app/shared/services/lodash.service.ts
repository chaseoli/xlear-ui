import * as lo from 'lodash';
import { Injectable } from '@angular/core';

@Injectable()
export class LodashService {

    get _() {
        return lo
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient) { }

  async readTextFile(filePath: string): Promise<string> {
    try {
      const response = await this.http.get(filePath, { responseType: 'text' }).toPromise();
      if (typeof response === 'string') {
        return response;
      } else {
        throw new Error('Invalid file response');
      }
    } catch (error) {
      console.error('Error reading file:', error);
      return 'Error reading file';
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('SPOONACULAR_API_KEY');
  }

  async getRecipesByIngredients(ingredients: string): Promise<any> {
    const { data } = await this.httpService.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        apiKey: this.apiKey,
        ingredients,
      },
    }).toPromise();

    return data;
  }

  async getRecipeById(id: string): Promise<any> {
    const { data } = await this.httpService.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: this.apiKey,
      },
    }).toPromise();

    return { recipe: data };
  }

}
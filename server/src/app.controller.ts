import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('recipes')
  async getRecipesByIngredients(@Query('ingredients') ingredients: string): Promise<any> {
    const recipes = await this.appService.getRecipesByIngredients(ingredients);

    return { recipes };
  }

  
  @Get('recipes/:id')
  async getRecipeById(@Param('id') id: string): Promise<any> {
    const recipe = await this.appService.getRecipeById(id);

    return { recipe };
  }


}

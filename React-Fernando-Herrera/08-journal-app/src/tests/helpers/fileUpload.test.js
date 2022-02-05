import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dzk6hkcip', 
    api_key: '264846174891826', 
    api_secret: 'gmUVZK3-Nlv7Fiu6ikHu_2VNtVo',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');

        const blod = await resp.blob();

        const file = new File([blod], 'foto.png');
        const url = await fileUpload(file);

        expect( typeof url).toBe('string');

        // Borrar Imagen
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
        });
    });

    test('debe de retornar un error', async () => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
    
    
  
})

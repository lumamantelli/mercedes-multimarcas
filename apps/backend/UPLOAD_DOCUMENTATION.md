# Documentação do Sistema de Upload de Fotos

## Visão Geral

Sistema de upload de fotos configurado com Multer para gerenciar uploads de imagens de carros e motos, organizando automaticamente em pastas específicas.

## Estrutura de Pastas Criadas

```
uploads/
├── Carro/          # Fotos de carros
├── Moto/           # Fotos de motos
└── Geral/          # Outros tipos (fallback)
```

## Configuração do Multer

### Tipos de Arquivo Suportados

- **Imagens:** .jpg, .jpeg, .png, .gif, .webp
- **Tamanho Máximo:** 5MB por arquivo
- **Limite de Arquivos:** 10 arquivos por upload

### Nomenclatura dos Arquivos

Formato: `{tipo}_{timestamp}_{random}.{extensao}`
Exemplo: `carro_1703123456789_342.jpg`

## Endpoints Disponíveis

### Carros

#### Upload de Foto Única

```http
POST /api/carros/upload/foto
Content-Type: multipart/form-data

Body:
- foto: [arquivo de imagem]
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Foto do carro enviada com sucesso!",
  "arquivo": {
    "nomeOriginal": "meu_carro.jpg",
    "nomeArquivo": "carro_1703123456789_342.jpg",
    "tamanho": 1048576,
    "tipo": "image/jpeg",
    "pasta": "uploads/Carro",
    "caminhoCompleto": "C:\\projeto\\uploads\\Carro\\carro_1703123456789_342.jpg"
  }
}
```

#### Upload de Múltiplas Fotos

```http
POST /api/carros/upload/fotos
Content-Type: multipart/form-data

Body:
- fotos: [arquivo1, arquivo2, arquivo3...] (máx 5)
```

**Resposta de Sucesso (200):**

```json
{
  "message": "3 foto(s) do carro enviada(s) com sucesso!",
  "arquivos": [
    {
      "nomeOriginal": "carro1.jpg",
      "nomeArquivo": "carro_1703123456789_342.jpg",
      "tamanho": 1048576,
      "tipo": "image/jpeg",
      "pasta": "uploads/Carro",
      "caminhoCompleto": "C:\\projeto\\uploads\\Carro\\carro_1703123456789_342.jpg"
    }
  ],
  "total": 3
}
```

### Motos

#### Upload de Foto Única

```http
POST /api/motos/upload/foto
Content-Type: multipart/form-data

Body:
- foto: [arquivo de imagem]
```

#### Upload de Múltiplas Fotos

```http
POST /api/motos/upload/fotos
Content-Type: multipart/form-data

Body:
- fotos: [arquivo1, arquivo2, arquivo3...] (máx 5)
```

## Tratamento de Erros

### Erro de Arquivo Muito Grande

```json
{
  "error": "Arquivo muito grande. Tamanho máximo: 5MB"
}
```

### Erro de Muitos Arquivos

```json
{
  "error": "Muitos arquivos. Máximo permitido: 10 arquivos"
}
```

### Erro de Tipo de Arquivo Inválido

```json
{
  "error": "Tipo de arquivo não permitido. Use apenas: .jpg, .jpeg, .png, .gif, .webp"
}
```

### Erro de Nenhum Arquivo Enviado

```json
{
  "error": "Nenhum arquivo foi enviado"
}
```

## Como Testar com cURL

### Upload de Foto de Carro

```bash
curl -X POST http://localhost:4000/api/carros/upload/foto \
  -F "foto=@caminho/para/sua/imagem.jpg"
```

### Upload de Múltiplas Fotos de Moto

```bash
curl -X POST http://localhost:4000/api/motos/upload/fotos \
  -F "fotos=@imagem1.jpg" \
  -F "fotos=@imagem2.jpg" \
  -F "fotos=@imagem3.jpg"
```

## Como Testar com Postman

1. **Método:** POST
2. **URL:** `http://localhost:4000/api/carros/upload/foto`
3. **Body:**
   - Selecione `form-data`
   - Key: `foto` (tipo: File)
   - Value: Selecione o arquivo de imagem

## Funções Utilitárias Disponíveis

### Verificar se Arquivo Existe

```typescript
import { arquivoExiste } from '../utils/multer';

const existe = arquivoExiste('carro_1703123456789_342.jpg', 'carro');
```

### Deletar Arquivo

```typescript
import { deletarArquivo } from '../utils/multer';

const deletado = deletarArquivo('carro_1703123456789_342.jpg', 'carro');
```

### Obter Caminho Completo

```typescript
import { obterCaminhoCompleto } from '../utils/multer';

const caminho = obterCaminhoCompleto('carro_1703123456789_342.jpg', 'carro');
```

## Logs do Sistema

O sistema gera logs informativos durante o processo:

```
📁 Diretório criado: C:\projeto\uploads\Carro
📸 Salvando imagem em: C:\projeto\uploads\Carro
📝 Nome do arquivo gerado: carro_1703123456789_342.jpg
✅ Arquivo aceito: meu_carro.jpg
🚗 Tipo de veículo configurado: carro
🚀 Configuração do Multer carregada com sucesso!
```

## Integração com Frontend

### JavaScript/Fetch

```javascript
// Upload de uma foto
const formData = new FormData();
formData.append('foto', arquivo);

const response = await fetch('/api/carros/upload/foto', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
```

### React com useState

```jsx
const [arquivo, setArquivo] = useState(null);

const handleUpload = async () => {
  const formData = new FormData();
  formData.append('foto', arquivo);

  try {
    const response = await fetch('/api/carros/upload/foto', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('Upload concluído:', result);
  } catch (error) {
    console.error('Erro no upload:', error);
  }
};
```

## Considerações de Segurança

1. **Validação de Tipo:** Apenas tipos de imagem são permitidos
2. **Limite de Tamanho:** Máximo 5MB por arquivo
3. **Nomenclatura Segura:** Nomes são gerados automaticamente
4. **Estrutura Organizada:** Arquivos separados por tipo de veículo

## Próximos Passos

1. Adicionar compressão de imagem automática
2. Implementar redimensionamento para thumbnails
3. Adicionar validação de dimensões mínimas/máximas
4. Criar sistema de backup para uploads
5. Implementar limpeza automática de arquivos antigos

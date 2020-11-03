export const COLOCAR_VALOR = 'COLOCAR_VALOR'
export const colocarValor = (field,value) => ({
    type:COLOCAR_VALOR,
    field:field,
    value:value
})


export const SALVAR_VD = 'SALVAR_VD'
export const salvarVd = (vd) => ({
    type:SALVAR_VD,
    vd:vd
})

export const EDITAR_VAR = 'EDITAR_VAR'
export const editarVar = (vdEdit) => ({
    type:EDITAR_VAR,
    vdEdit:vdEdit
})

export const EXCLUIR_VAR = 'EXCLUIR_VAR'
export const excluirVar = vdExcluir => ({
    type:EXCLUIR_VAR,
    vdExcluir:vdExcluir
})


export const MUDAR_PICKER_FO = 'MUDAR_PICKER_FO'
export const mudarPickerFo = text => ({
    type:MUDAR_PICKER_FO,
    text:text
})

export const COLOCAR_VALOR_FO = 'COLOCAR_VALOR_FO'
export const colocarValorFo = (field,value) => ({
    type:COLOCAR_VALOR_FO,
    field:field,
    value:value
})

export const COLOCAR_VALOR_REST = 'COLOCAR_VALOR_REST'
export const colocarValorRest = (field,value) => ({
    type:COLOCAR_VALOR_REST,
    field:field,
    value:value
})

export const MUDAR_PICKER_REST = 'MUDAR_PICKER_REST'
export const mudarPickerRest = text => ({
    type:MUDAR_PICKER_REST,
    text:text
})

export const SALVAR_REST = 'SALVAR_REST'
export const salvarRest = restSaved => ({
    type:SALVAR_REST,
    restSaved:restSaved
})

export const LIMPAR_REST = 'LIMPAR_REST'
export const limparRest = () =>({
    type:LIMPAR_REST
})

export const EXCLUIR_REST = 'EXCLUIR_REST'
export const excluirRest = restExcluir => ({
    type:EXCLUIR_REST,
    restExcluir:restExcluir
})

export const EDITAR_REST = 'EDITAR_REST'
export const editarRest = restEditar => ({
    type:EDITAR_REST,
    restEditar:restEditar
})
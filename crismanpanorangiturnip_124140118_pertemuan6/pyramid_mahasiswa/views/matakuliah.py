from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Matakuliah


def get_matakuliah(request):
    matakuliah_id = request.matchdict['id']
    try:
        int(matakuliah_id)
    except ValueError:
        return HTTPNotFound(json_body={
            'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'
        })
    item = request.dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id
    ).first()
    if item is None:
        return HTTPNotFound(json_body={
            'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'
        })
    return item


def get_json(request):
    try:
        data = request.json_body
    except ValueError:
        return HTTPBadRequest(json_body={
            'error': 'Body harus berupa JSON valid'
        })
    if not isinstance(data, dict):
        return HTTPBadRequest(json_body={
            'error': 'Body harus berupa objek JSON'
        })
    return data


def validate_fields(data, required):
    for field in required:
        if field not in data or data[field] is None or data[field] == '':
            return HTTPBadRequest(json_body={
                'error': f'Field {field} wajib diisi!'
            })
    for field in ('kode_mk', 'nama_mk'):
        if field in data and (
            not isinstance(data[field], str) or not data[field].strip()
        ):
            return HTTPBadRequest(json_body={
                'error': f'Field {field} wajib diisi!'
            })
    for field in ('sks', 'semester'):
        if field in data and (
            type(data[field]) is not int or data[field] <= 0
        ):
            return HTTPBadRequest(json_body={
                'error': f'Field {field} harus bilangan bulat positif'
            })
    return None


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    data = request.dbsession.query(Matakuliah).order_by(Matakuliah.id).all()
    return {'matakuliahs': [item.to_dict() for item in data]}


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    item = get_matakuliah(request)
    if isinstance(item, HTTPNotFound):
        return item
    return {'matakuliah': item.to_dict()}


@view_config(route_name='matakuliah_add', renderer='json')
def matakuliah_add(request):
    data = get_json(request)
    if isinstance(data, HTTPBadRequest):
        return data
    error = validate_fields(data, ('kode_mk', 'nama_mk', 'sks', 'semester'))
    if error:
        return error
    item = Matakuliah(
        kode_mk=data['kode_mk'].strip(),
        nama_mk=data['nama_mk'].strip(),
        sks=data['sks'], semester=data['semester'],
    )
    request.dbsession.add(item)
    try:
        request.dbsession.flush()
    except IntegrityError:
        request.dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'Kode MK sudah digunakan'})
    return {'success': True, 'matakuliah': item.to_dict()}


@view_config(route_name='matakuliah_update', renderer='json')
def matakuliah_update(request):
    item = get_matakuliah(request)
    if isinstance(item, HTTPNotFound):
        return item
    data = get_json(request)
    if isinstance(data, HTTPBadRequest):
        return data
    error = validate_fields(data, ())
    if error:
        return error
    for field in ('kode_mk', 'nama_mk', 'sks', 'semester'):
        if field in data:
            if field in ('kode_mk', 'nama_mk'):
                value = data[field].strip()
            else:
                value = data[field]
            setattr(item, field, value)
    try:
        request.dbsession.flush()
    except IntegrityError:
        request.dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'Kode MK sudah digunakan'})
    return {'success': True, 'matakuliah': item.to_dict()}


@view_config(route_name='matakuliah_delete', renderer='json')
def matakuliah_delete(request):
    item = get_matakuliah(request)
    if isinstance(item, HTTPNotFound):
        return item
    request.dbsession.delete(item)
    return {
        'success': True,
        'message': (
            f'Matakuliah dengan ID {request.matchdict["id"]} berhasil dihapus'
        ),
    }

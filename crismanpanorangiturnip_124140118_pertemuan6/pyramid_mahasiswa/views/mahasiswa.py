from datetime import date

from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Mahasiswa


def get_mahasiswa(request):
    mahasiswa_id = request.matchdict['id']
    try:
        int(mahasiswa_id)
    except ValueError:
        return HTTPNotFound(json_body={
            'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'
        })
    mahasiswa = request.dbsession.query(Mahasiswa).filter_by(
        id=mahasiswa_id
    ).first()
    if mahasiswa is None:
        return HTTPNotFound(json_body={
            'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'
        })
    return mahasiswa


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


def get_tanggal_lahir(value):
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except (TypeError, ValueError):
        return HTTPBadRequest(json_body={
            'error': (
                'Format tanggal lahir tidak valid. '
                'Gunakan format YYYY-MM-DD'
            )
        })


@view_config(route_name='mahasiswa_list', renderer='json')
def mahasiswa_list(request):
    data = request.dbsession.query(Mahasiswa).order_by(Mahasiswa.id).all()
    return {'mahasiswas': [item.to_dict() for item in data]}


@view_config(route_name='mahasiswa_detail', renderer='json')
def mahasiswa_detail(request):
    mahasiswa = get_mahasiswa(request)
    if isinstance(mahasiswa, HTTPNotFound):
        return mahasiswa
    return {'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_add', renderer='json')
def mahasiswa_add(request):
    data = get_json(request)
    if isinstance(data, HTTPBadRequest):
        return data
    for field in ('nim', 'nama', 'jurusan'):
        if not isinstance(data.get(field), str) or not data[field].strip():
            return HTTPBadRequest(json_body={
                'error': f'Field {field} wajib diisi!'
            })
    tanggal_lahir = get_tanggal_lahir(data.get('tanggal_lahir'))
    if isinstance(tanggal_lahir, HTTPBadRequest):
        return tanggal_lahir
    mahasiswa = Mahasiswa(
        nim=data['nim'].strip(), nama=data['nama'].strip(),
        jurusan=data['jurusan'].strip(), tanggal_lahir=tanggal_lahir,
        alamat=data.get('alamat'),
    )
    request.dbsession.add(mahasiswa)
    try:
        request.dbsession.flush()
    except IntegrityError:
        request.dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'NIM sudah digunakan'})
    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_update', renderer='json')
def mahasiswa_update(request):
    mahasiswa = get_mahasiswa(request)
    if isinstance(mahasiswa, HTTPNotFound):
        return mahasiswa
    data = get_json(request)
    if isinstance(data, HTTPBadRequest):
        return data
    for field in ('nim', 'nama', 'jurusan'):
        if field in data:
            if not isinstance(data[field], str) or not data[field].strip():
                return HTTPBadRequest(json_body={
                    'error': f'Field {field} wajib diisi!'
                })
    if 'tanggal_lahir' in data:
        tanggal_lahir = get_tanggal_lahir(data['tanggal_lahir'])
        if isinstance(tanggal_lahir, HTTPBadRequest):
            return tanggal_lahir
    for field in ('nim', 'nama', 'jurusan'):
        if field in data:
            setattr(mahasiswa, field, data[field].strip())
    if 'tanggal_lahir' in data:
        mahasiswa.tanggal_lahir = tanggal_lahir
    if 'alamat' in data:
        mahasiswa.alamat = data['alamat']
    try:
        request.dbsession.flush()
    except IntegrityError:
        request.dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'NIM sudah digunakan'})
    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_delete', renderer='json')
def mahasiswa_delete(request):
    mahasiswa = get_mahasiswa(request)
    if isinstance(mahasiswa, HTTPNotFound):
        return mahasiswa
    request.dbsession.delete(mahasiswa)
    return {
        'success': True,
        'message': (
            f'Mahasiswa dengan ID {request.matchdict["id"]} berhasil dihapus'
        ),
    }

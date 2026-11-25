import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """Isi data awal mahasiswa dan minimal tiga matakuliah."""
    mahasiswa = [
        models.Mahasiswa(
            nim='12345', nama='Budi Santoso', jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung',
        ),
        models.Mahasiswa(
            nim='54321', nama='Siti Aminah', jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta',
        ),
    ]
    matakuliah = [
        models.Matakuliah(
            kode_mk='IF2110', nama_mk='Pemrograman Web', sks=3, semester=3
        ),
        models.Matakuliah(
            kode_mk='IF3140', nama_mk='Basis Data', sks=3, semester=5
        ),
        models.Matakuliah(
            kode_mk='IF2120', nama_mk='Algoritma dan Struktur Data',
            sks=4, semester=3,
        ),
    ]
    for item in mahasiswa:
        exists = dbsession.query(models.Mahasiswa).filter_by(
            nim=item.nim
        ).first()
        if not exists:
            dbsession.add(item)
    for item in matakuliah:
        exists = dbsession.query(models.Matakuliah).filter_by(
            kode_mk=item.kode_mk
        ).first()
        if not exists:
            dbsession.add(item)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print('Berhasil memasukkan data awal mahasiswa dan matakuliah!')
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check README.md for installation instructions and try again.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')


if __name__ == '__main__':
    main()
